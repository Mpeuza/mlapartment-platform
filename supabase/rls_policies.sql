-- Row Level Security policies — run AFTER schema.sql
alter table profiles enable row level security;

create policy "Users view own profile" on profiles for select using (auth.uid() = id);
create policy "Users insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users update own profile" on profiles for update using (auth.uid() = id);

create policy "Owners view their tenants' profiles" on profiles for select using (
  exists (select 1 from leases l join units u on u.id = l.unit_id where l.tenant_id = profiles.id and u.owner_id = auth.uid())
);

create policy "Owners manage own units" on units for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "Tenants view their unit" on units for select using (
  exists (select 1 from leases where leases.unit_id = units.id and leases.tenant_id = auth.uid())
);

create policy "Owners manage leases on own units" on leases for all
  using (exists (select 1 from units where units.id = leases.unit_id and units.owner_id = auth.uid()))
  with check (exists (select 1 from units where units.id = leases.unit_id and units.owner_id = auth.uid()));
create policy "Tenants view own lease" on leases for select using (tenant_id = auth.uid());

create policy "Tenants view own payments" on payments for select using (
  exists (select 1 from leases where leases.id = payments.lease_id and leases.tenant_id = auth.uid())
);
create policy "Owners view payments on own units" on payments for select using (
  exists (select 1 from leases join units on units.id = leases.unit_id where leases.id = payments.lease_id and units.owner_id = auth.uid())
);
create policy "Tenants create pending payments for own lease" on payments for insert with check (
  exists (select 1 from leases where leases.id = payments.lease_id and leases.tenant_id = auth.uid())
);

create policy "Tenants view own messages" on messages for select using (
  exists (select 1 from leases where leases.id = messages.lease_id and leases.tenant_id = auth.uid())
);
create policy "Owners view messages on own units" on messages for select using (
  exists (select 1 from leases join units on units.id = leases.unit_id where leases.id = messages.lease_id and units.owner_id = auth.uid())
);
create policy "Owners send messages on own units" on messages for insert with check (
  sender = 'owner' and exists (select 1 from leases join units on units.id = leases.unit_id where leases.id = messages.lease_id and units.owner_id = auth.uid())
);

create policy "Owners view agent logs on own units" on agent_logs for select using (
  exists (select 1 from leases join units on units.id = leases.unit_id where leases.id = agent_logs.lease_id and units.owner_id = auth.uid())
);

create policy "Public views available listings" on listings for select using (status = 'available');
create policy "Owners manage own listings" on listings for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Anyone can submit an application" on applications for insert with check (true);
create policy "Owners view applications for their listings" on applications for select using (
  exists (select 1 from listings where listings.id = applications.listing_id and listings.owner_id = auth.uid())
);
create policy "Owners update applications for their listings" on applications for update using (
  exists (select 1 from listings where listings.id = applications.listing_id and listings.owner_id = auth.uid())
);

create index if not exists idx_listings_owner on listings(owner_id);
create index if not exists idx_applications_listing on applications(listing_id);
create index if not exists idx_units_owner on units(owner_id);
create index if not exists idx_leases_tenant on leases(tenant_id);
create index if not exists idx_leases_unit on leases(unit_id);
create index if not exists idx_payments_lease on payments(lease_id);
create index if not exists idx_messages_lease on messages(lease_id);
create index if not exists idx_agent_logs_lease on agent_logs(lease_id);