insert into storage.buckets (id, name, public) values ('memories', 'memories', true) on conflict (id) do nothing;

create policy "Public read memories"
on storage.objects for select
using (bucket_id = 'memories');
