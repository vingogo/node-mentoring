CREATE DATABASE "usersDB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE EXTENSION pgcrypto
    SCHEMA public
    VERSION "1.3";

CREATE TABLE public.users
(
    id uuid DEFAULT gen_random_uuid(),
    login character varying(250) NOT NULL,
    password character varying(250) NOT NULL,
    age numeric NOT NULL,
    "isDeleted" boolean NOT NULL DEFAULT false,
    PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;


INSERT INTO public.users(
	login, password, age)
	VALUES ('test', 'test', 25),
	('test2', 'test2', 24),
	('test3', 'test3', 30, true);


CREATE TABLE public.groups
(
    id uuid DEFAULT gen_random_uuid(),
    name character varying(250) NOT NULL,
    permissions character varying[],
    PRIMARY KEY (id)
)

ALTER TABLE public.groups
    OWNER to postgres;


INSERT INTO public.groups(
    name, permissions)
    VALUES ('default', array['READ']),
    ('admins', array['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'])