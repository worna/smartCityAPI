DROP TABLE IF EXISTS customer CASCADE;
CREATE TABLE customer (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name varchar,
    last_name varchar,
    birth_date date,
    gender integer,
    phone_number varchar,
    email varchar,
    password varchar,
    inscription_date date,
    is_manager integer ,
    is_instructor integer ,
    language varchar
);
INSERT INTO customer (first_name, last_name, birth_date, gender, phone_number, email, password, inscription_date, is_manager, is_instructor, "language") VALUES
('Vicky','Zagorski','2000-09-14',1,'0474235689','etu1234@henallux.be','$2a$10$vQ1rrXjoPNYhualYPfWlFec41p3JpSQH33B4VwXEyeaUTKmoF4VSy', '2020-11-25', 1, 0, 'french'),
('Arnaud','Lockman','2001-02-07',0,'0474025605','etu40153@henallux.be','$2a$10$fiKILzSQn2YvA.mbmxhqa.7f8pErrnl4qofZY7nE/a5Vq8KakfPKG', '2020-11-10', 0, 1, 'english');

DROP TABLE IF EXISTS sport_hall CASCADE;
CREATE TABLE sport_hall (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar,
    manager integer,
    phone_number varchar,
    email varchar
);

INSERT INTO sport_hall (name, manager, phone_number, email) VALUES
('Jims', 1, '0123456789', 'lodsqz@udi.com'),
('Basic fit', 2, '7894561230', 'mail@hotmail.com'),
('aaaa', 1, '145236987', '12344598');

DROP TABLE IF EXISTS sport_hall_customer CASCADE;
CREATE TABLE sport_hall_customer (
    id_sport_hall integer REFERENCES sport_hall(id) DEFERRABLE INITIALLY IMMEDIATE,
    id_customer integer REFERENCES customer(id) DEFERRABLE INITIALLY IMMEDIATE,
    PRIMARY KEY(id_sport_hall, id_customer)
);

DROP TABLE IF EXISTS course CASCADE;
CREATE TABLE course (
    id SERIAL,
    id_sport_hall integer REFERENCES sport_hall(id) DEFERRABLE INITIALLY IMMEDIATE,
    starting_date_time DATE,
    ending_date_time DATE ,
    level VARCHAR,
    activity VARCHAR,
    room VARCHAR,
    id_instructor integer REFERENCES customer(id) DEFERRABLE INITIALLY IMMEDIATE ,
    PRIMARY KEY(id_sport_hall, id)
);
INSERT INTO course (id_sport_hall, starting_date_time, ending_date_time, level, activity, room, id_instructor) VALUES
    (1, '2020-11-24', '2020-11-24', 'A voir si on a des problèmes', 'Développement de client Web avancé', 'A distance', 2),
    (1, '2020-11-23', '2020-11-24', 'Facile', 'HIP HOP', 'salle bleue', 2),
    (3, '2020-11-24', '2020-11-24', 'Enfant (10-14)', 'Break', 'salle n°2', 1);
