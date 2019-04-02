drop table if exists pets cascade;

create table pets
(
  name			varchar(100)						not null,
  id			serial								not null,
  breedName		varchar(100),
  primary key (name, id),
  foreign key (id) references owners,
  foreign key (breedName) references petbreeds
);