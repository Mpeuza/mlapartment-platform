-- MLApartment: core schema
-- Run this in the Supabase SQL editor after creating your project

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null check (role in ('tenant', 'owner')),
  phone_number text,
  created_at timestamptz default now()
);

create table if not exists units (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id),
  address text not null,
  monthly_rent numeric not null,
  currency text default 'ZAR',
  created_at timestamptz default now()
);

create table if not exists leases (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references units(id),
  tenant_id uuid references profiles(id),
  start_date date not null,
  end_date date,
  status text default 'active' check (status in ('active', 'ended'))
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  lease_id uuid references leases(id),
  amount numeric not null,
  currency text default 'ZAR',
  type text default 'rent' check (type in ('rent', 'service', 'deposit', 'other')),
  provider text,
  provider_reference text,
  status text default 'pending' check (status in ('pending', 'paid', 'failed')),
  paid_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  lease_id uuid references leases(id),
  sender text not null check (sender in ('tenant', 'agent', 'owner')),
  body text not null,
  whatsapp_message_id text,
  created_at timestamptz default now()
);

create table if not exists agent_logs (
  id uuid primary key default gen_random_uuid(),
  lease_id uuid references leases(id),
  event text not null,
  detail jsonb,
  created_at timestamptz default now()
);

alter table units enable row level security;
alter table leases enable row level security;
alter table payments enable row level security;
alter table messages enable row level security;
alter table agent_logs enable row level security;

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id),
  address text not null,
  description text,
  monthly_rent numeric not null,
  currency text default 'ZAR',
  bedrooms int,
  bathrooms int,
  photos text[] default '{}',
  status text default 'available' check (status in ('available', 'unavailable')),
  created_at timestamptz default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id),
  full_name text not null,
  email text not null,
  phone text not null,
  employment_info text,
  move_in_date date,
  contract_accepted_at timestamptz,
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'failed')),
  paystack_reference text,
  status text default 'submitted' check (status in ('submitted', 'approved', 'rejected')),
  created_at timestamptz default now()
);

alter table listings enable row level security;
alter table applications enable row level security;