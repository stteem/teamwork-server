--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

-- Started on 2019-11-11 18:37:19

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2861 (class 1262 OID 16394)
-- Name: teamwork; Type: DATABASE; Schema: -; Owner: uke
--

CREATE DATABASE teamwork WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';


ALTER DATABASE teamwork OWNER TO uke;

\connect teamwork

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 40985)
-- Name: articles; Type: TABLE; Schema: public; Owner: uke
--

CREATE TABLE public.articles (
    articleid integer NOT NULL,
    title character varying(255),
    body text,
    createdon date,
    userid integer
);


ALTER TABLE public.articles OWNER TO uke;

--
-- TOC entry 204 (class 1259 OID 40983)
-- Name: articles_articleid_seq; Type: SEQUENCE; Schema: public; Owner: uke
--

CREATE SEQUENCE public.articles_articleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_articleid_seq OWNER TO uke;

--
-- TOC entry 2862 (class 0 OID 0)
-- Dependencies: 204
-- Name: articles_articleid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: uke
--

ALTER SEQUENCE public.articles_articleid_seq OWNED BY public.articles.articleid;


--
-- TOC entry 209 (class 1259 OID 41014)
-- Name: comments; Type: TABLE; Schema: public; Owner: uke
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    articleid integer,
    comment text,
    createdon date
);


ALTER TABLE public.comments OWNER TO uke;

--
-- TOC entry 208 (class 1259 OID 41012)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: uke
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO uke;

--
-- TOC entry 2863 (class 0 OID 0)
-- Dependencies: 208
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: uke
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 207 (class 1259 OID 40998)
-- Name: images; Type: TABLE; Schema: public; Owner: uke
--

CREATE TABLE public.images (
    imageid integer NOT NULL,
    userid integer,
    imageurl text,
    title text,
    datecreated date,
    imagename character varying(255)
);


ALTER TABLE public.images OWNER TO uke;

--
-- TOC entry 206 (class 1259 OID 40996)
-- Name: images_imageid_seq; Type: SEQUENCE; Schema: public; Owner: uke
--

CREATE SEQUENCE public.images_imageid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_imageid_seq OWNER TO uke;

--
-- TOC entry 2864 (class 0 OID 0)
-- Dependencies: 206
-- Name: images_imageid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: uke
--

ALTER SEQUENCE public.images_imageid_seq OWNED BY public.images.imageid;


--
-- TOC entry 203 (class 1259 OID 16397)
-- Name: users; Type: TABLE; Schema: public; Owner: uke
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    firstname character varying(40),
    lastname character varying(40),
    email character varying(50),
    password character varying(255),
    gender character varying(40),
    jobrole character varying(40),
    department character varying(40),
    address character varying(50),
    maritalstatus character varying(10),
    date timestamp(6) with time zone
);


ALTER TABLE public.users OWNER TO uke;

--
-- TOC entry 202 (class 1259 OID 16395)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: uke
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO uke;

--
-- TOC entry 2865 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: uke
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- TOC entry 2710 (class 2604 OID 40988)
-- Name: articles articleid; Type: DEFAULT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.articles ALTER COLUMN articleid SET DEFAULT nextval('public.articles_articleid_seq'::regclass);


--
-- TOC entry 2712 (class 2604 OID 41017)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 2711 (class 2604 OID 41001)
-- Name: images imageid; Type: DEFAULT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.images ALTER COLUMN imageid SET DEFAULT nextval('public.images_imageid_seq'::regclass);


--
-- TOC entry 2709 (class 2604 OID 16400)
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- TOC entry 2851 (class 0 OID 40985)
-- Dependencies: 205
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: uke
--

INSERT INTO public.articles (articleid, title, body, createdon, userid) VALUES (6, 'My awesome article', 'An article that will change the world', '2019-11-11', 107);


--
-- TOC entry 2855 (class 0 OID 41014)
-- Dependencies: 209
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: uke
--

INSERT INTO public.comments (id, articleid, comment, createdon) VALUES (1, 5, 'My awesome comment', '2019-11-11');
INSERT INTO public.comments (id, articleid, comment, createdon) VALUES (2, 5, 'My awesome comment', '2019-11-11');


--
-- TOC entry 2853 (class 0 OID 40998)
-- Dependencies: 207
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: uke
--

INSERT INTO public.images (imageid, userid, imageurl, title, datecreated, imagename) VALUES (4, 107, 'http://res.cloudinary.com/dk02ty1w8/image/upload/v1573444849/tuoraaso5w54mhbjccjs.jpg', 'good  gif again again', '2019-11-11', '67110768_494024561353608_3751404154937933824_n.jpg1573444837015.jpg');
INSERT INTO public.images (imageid, userid, imageurl, title, datecreated, imagename) VALUES (5, 107, 'http://res.cloudinary.com/dk02ty1w8/image/upload/v1573445028/lp5ezp3jmhww86mei4nx.jpg', 'good  gif again again', '2019-11-11', '67110768_494024561353608_3751404154937933824_n.jpg1573445017477.jpg');


--
-- TOC entry 2849 (class 0 OID 16397)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: uke
--

INSERT INTO public.users (userid, firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus, date) VALUES (1, 'Joy', 'Ejiofor', 'joy@gmail.com', 'password', 'female', 'Program Manager', 'Education', 'Lekki peninsula', 'Married', NULL);
INSERT INTO public.users (userid, firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus, date) VALUES (2, 'Rachael', 'Onoja', 'rachael@gmail.com', 'password', 'female', 'Program Manager', 'Education', 'Lekki peninsula', 'single', NULL);
INSERT INTO public.users (userid, firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus, date) VALUES (5, 'Ubong', 'Afangideh', 'ub@gmail.com', 'password', 'male', 'Community Manager', 'Education', 'Andela', 'married', NULL);
INSERT INTO public.users (userid, firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus, date) VALUES (106, 'Ubong', 'Umoh', 'ubo@gmail.com', '$2b$08$zq6dC3wSfxV8Tr.KQUiN0OSWojNWkccvhQgSQyMB4.P.omnMVt7Yq', 'male', 'Community Manager', 'Education', 'Andela', 'single', '2019-11-10 20:11:44.647+00');
INSERT INTO public.users (userid, firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus, date) VALUES (107, 'Ekong', 'Udoh', 'ekon@gmail.com', '$2b$08$oB8XFfQGnDzseGEniJuimO0kZDErCi76OMhjQkqqPgyo0GN6vXLAm', 'male', 'Manager', 'Education', 'Lagos', 'single', '2019-11-10 20:21:31.375+00');


--
-- TOC entry 2866 (class 0 OID 0)
-- Dependencies: 204
-- Name: articles_articleid_seq; Type: SEQUENCE SET; Schema: public; Owner: uke
--

SELECT pg_catalog.setval('public.articles_articleid_seq', 7, true);


--
-- TOC entry 2867 (class 0 OID 0)
-- Dependencies: 208
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: uke
--

SELECT pg_catalog.setval('public.comments_id_seq', 2, true);


--
-- TOC entry 2868 (class 0 OID 0)
-- Dependencies: 206
-- Name: images_imageid_seq; Type: SEQUENCE SET; Schema: public; Owner: uke
--

SELECT pg_catalog.setval('public.images_imageid_seq', 5, true);


--
-- TOC entry 2869 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: uke
--

SELECT pg_catalog.setval('public.users_userid_seq', 107, true);


--
-- TOC entry 2716 (class 2606 OID 40993)
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (articleid);


--
-- TOC entry 2720 (class 2606 OID 41022)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 2718 (class 2606 OID 41006)
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (imageid);


--
-- TOC entry 2714 (class 2606 OID 16402)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 2721 (class 2606 OID 41007)
-- Name: images none; Type: FK CONSTRAINT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT "none" FOREIGN KEY (userid) REFERENCES public.users(userid) NOT VALID;


-- Completed on 2019-11-11 18:37:27

--
-- PostgreSQL database dump complete
--

