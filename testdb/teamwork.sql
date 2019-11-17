--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

-- Started on 2019-11-17 11:35:54

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
    article text,
    createdon timestamp(4) without time zone,
    userid integer
);

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

--
-- TOC entry 2873 (class 0 OID 0)
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
    createdon timestamp(4) without time zone,
    authorid integer
);

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

--
-- TOC entry 2874 (class 0 OID 0)
-- Dependencies: 208
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: uke
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 211 (class 1259 OID 41025)
-- Name: gifcomments; Type: TABLE; Schema: public; Owner: uke
--

CREATE TABLE public.gifcomments (
    id integer NOT NULL,
    imageid integer,
    comment text,
    createdon timestamp(4) without time zone,
    authorid integer
);

--
-- TOC entry 210 (class 1259 OID 41023)
-- Name: gifcomments_id_seq; Type: SEQUENCE; Schema: public; Owner: uke
--

CREATE SEQUENCE public.gifcomments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

--
-- TOC entry 2875 (class 0 OID 0)
-- Dependencies: 210
-- Name: gifcomments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: uke
--

ALTER SEQUENCE public.gifcomments_id_seq OWNED BY public.gifcomments.id;


--
-- TOC entry 207 (class 1259 OID 40998)
-- Name: images; Type: TABLE; Schema: public; Owner: uke
--

CREATE TABLE public.images (
    imageid integer NOT NULL,
    userid integer,
    imageurl text,
    title text,
    createdon timestamp(4) without time zone
);

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

--
-- TOC entry 2876 (class 0 OID 0)
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

--
-- TOC entry 2877 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: uke
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- TOC entry 2717 (class 2604 OID 40988)
-- Name: articles articleid; Type: DEFAULT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.articles ALTER COLUMN articleid SET DEFAULT nextval('public.articles_articleid_seq'::regclass);


--
-- TOC entry 2719 (class 2604 OID 41017)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 2720 (class 2604 OID 41028)
-- Name: gifcomments id; Type: DEFAULT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.gifcomments ALTER COLUMN id SET DEFAULT nextval('public.gifcomments_id_seq'::regclass);


--
-- TOC entry 2718 (class 2604 OID 41001)
-- Name: images imageid; Type: DEFAULT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.images ALTER COLUMN imageid SET DEFAULT nextval('public.images_imageid_seq'::regclass);


--
-- TOC entry 2716 (class 2604 OID 16400)
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- TOC entry 2861 (class 0 OID 40985)
-- Dependencies: 205
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: uke
--

COPY public.articles (articleid, title, article, createdon, userid) FROM stdin;
21	The gods must be crazy	An article about crazy gods	2019-11-13 20:41:51.613	106
22	The gods must be crazy	Been a while i posted on sm	2019-11-14 23:10:57.04	106
23	The gods must be crazy	Been a while i posted on sm	2019-11-14 23:13:09.284	106
18	Well done sir bro	Another	2019-11-15 06:59:54.821	106
\.


--
-- TOC entry 2865 (class 0 OID 41014)
-- Dependencies: 209
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: uke
--

COPY public.comments (id, articleid, comment, createdon, authorid) FROM stdin;
25	6	The gods have always been crazy	2019-11-13 20:42:50.381	106
26	6	Unleash the dragon	2019-11-13 20:43:24.466	106
27	21	Unleash the dragon	2019-11-13 20:43:58.463	106
28	21	The gods have always been crazy	2019-11-13 20:44:09.884	106
29	21	The gods have always been crazy	2019-11-14 08:04:45.456	106
42	21	Check it out NOW NOW	2019-11-14 15:21:05.395	106
43	21	Check it out NOW NOW ooo	2019-11-14 17:22:45.085	106
44	21	Check it out NOW NOW omg	2019-11-14 23:24:58.904	106
45	21	Check it out NOW NOW omg	2019-11-14 23:25:19.288	106
46	21	Check it out NOW NOW omg	2019-11-14 23:29:25.676	106
47	21	Check it out NOW NOW omg	2019-11-14 23:33:55.785	106
48	21	Check it out NOW NOW omg	2019-11-14 23:39:48.358	106
49	21	are we there yet?	2019-11-15 05:21:35.762	106
50	21	so far so good	2019-11-15 05:23:38.979	106
51	21	so far so good we good	2019-11-15 06:49:29.45	106
\.


--
-- TOC entry 2867 (class 0 OID 41025)
-- Dependencies: 211
-- Data for Name: gifcomments; Type: TABLE DATA; Schema: public; Owner: uke
--

COPY public.gifcomments (id, imageid, comment, createdon, authorid) FROM stdin;
7	4	good grief	2019-11-14 14:39:46.695	106
44	4	omg again not again oooo again	2019-11-14 16:52:02.169	106
47	4	omg again not again oooo again	2019-11-14 17:11:05.182	106
48	4	omg again not again oooo again	2019-11-14 17:17:19.017	106
49	4	omg again not again oooo again	2019-11-14 17:18:18.056	106
50	4	omg again not again oooo again	2019-11-14 17:19:23.949	106
51	4	omg again not again oooo again	2019-11-14 17:19:45.202	106
52	4	omg not again ooo	2019-11-14 17:20:53.996	106
53	4	are we there yet?	2019-11-14 20:08:18.91	106
54	4	God is God	2019-11-14 20:11:02.03	106
55	4	God is God all the time	2019-11-14 21:59:46.273	106
56	4	God is God all the time, na zah o	2019-11-15 05:25:36.86	106
\.


--
-- TOC entry 2863 (class 0 OID 40998)
-- Dependencies: 207
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: uke
--

COPY public.images (imageid, userid, imageurl, title, createdon) FROM stdin;
4	107	http://res.cloudinary.com/dk02ty1w8/image/upload/v1573444849/tuoraaso5w54mhbjccjs.jpg	good  gif again again	2019-11-11 00:00:00
6	106	http://res.cloudinary.com/dk02ty1w8/image/upload/v1573573396/jntrwg4xmpwckqxlmte9.jpg	good  grief	2019-11-12 00:00:00
7	106	http://res.cloudinary.com/dk02ty1w8/image/upload/v1573573497/nd5xxzwm1pc5i6gk2sae.jpg	Flatmates Africa	2019-11-12 00:00:00
8	106	http://res.cloudinary.com/dk02ty1w8/image/upload/v1573573532/rx8nrkb7cfzaxekun9yy.jpg	Tenderness	2019-11-12 00:00:00
9	106	http://res.cloudinary.com/dk02ty1w8/image/upload/v1573573563/bxcwqatzrbimbdepobym.jpg	Value trade	2019-11-12 00:00:00
11	106	http://res.cloudinary.com/dk02ty1w8/image/upload/v1573573652/zhv7xfilckcbi9ibn18v.jpg	Pinky	2019-11-12 00:00:00
12	106	http://res.cloudinary.com/dk02ty1w8/image/upload/v1573573720/sb0wuijcham0s3uzu2z2.jpg	cyber crime	2019-11-12 00:00:00
13	106	http://res.cloudinary.com/dk02ty1w8/image/upload/v1573573754/mn4ir9j8apbx0hwayobq.jpg	Ukes	2019-11-12 00:00:00
14	106	http://res.cloudinary.com/dk02ty1w8/image/upload/v1573793209/dvvuqvjaqpoqcpeq0wyt.jpg	Ukes	2019-11-15 05:46:48.453
15	106	http://res.cloudinary.com/dk02ty1w8/image/upload/v1573793392/qhq1tuals2nlegdfzazj.jpg	Value	2019-11-15 05:49:50.928
\.


--
-- TOC entry 2859 (class 0 OID 16397)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: uke
--

COPY public.users (userid, firstname, lastname, email, password, gender, jobrole, department, address, maritalstatus, date) FROM stdin;
106	Ubong	Umoh	ubo@gmail.com	$2b$08$zq6dC3wSfxV8Tr.KQUiN0OSWojNWkccvhQgSQyMB4.P.omnMVt7Yq	male	Community Manager	Education	Andela	single	2019-11-10 20:11:44.647+00
107	Ekong	Udoh	ekon@gmail.com	$2b$08$oB8XFfQGnDzseGEniJuimO0kZDErCi76OMhjQkqqPgyo0GN6vXLAm	male	Manager	Education	Lagos	single	2019-11-10 20:21:31.375+00
108	Ekong	Udoh	eknu@gmail.com	$2b$08$JAg9KZMI4O1de/SNPOxr0eI8R/gSqb8MZiLKT6Qjkh1.2DVY58HDi	male	Manager	Education	Lagos	single	2019-11-14 17:42:43.275+00
109	Ekong	Udoh	eknu@gmail.com	$2b$08$VJoJYMxsvNE7xt5OP.7ow.Lwp00xLqGnIFCqDvwazSbwSpHvn.YkW	male	Manager	Education	Lagos	single	2019-11-14 17:58:21.929+00
\.


--
-- TOC entry 2878 (class 0 OID 0)
-- Dependencies: 204
-- Name: articles_articleid_seq; Type: SEQUENCE SET; Schema: public; Owner: uke
--

SELECT pg_catalog.setval('public.articles_articleid_seq', 24, true);


--
-- TOC entry 2879 (class 0 OID 0)
-- Dependencies: 208
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: uke
--

SELECT pg_catalog.setval('public.comments_id_seq', 51, true);


--
-- TOC entry 2880 (class 0 OID 0)
-- Dependencies: 210
-- Name: gifcomments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: uke
--

SELECT pg_catalog.setval('public.gifcomments_id_seq', 56, true);


--
-- TOC entry 2881 (class 0 OID 0)
-- Dependencies: 206
-- Name: images_imageid_seq; Type: SEQUENCE SET; Schema: public; Owner: uke
--

SELECT pg_catalog.setval('public.images_imageid_seq', 15, true);


--
-- TOC entry 2882 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: uke
--

SELECT pg_catalog.setval('public.users_userid_seq', 117, true);


--
-- TOC entry 2724 (class 2606 OID 40993)
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (articleid);


--
-- TOC entry 2728 (class 2606 OID 41022)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 2730 (class 2606 OID 41033)
-- Name: gifcomments gifcomments_pkey; Type: CONSTRAINT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.gifcomments
    ADD CONSTRAINT gifcomments_pkey PRIMARY KEY (id);


--
-- TOC entry 2726 (class 2606 OID 41006)
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (imageid);


--
-- TOC entry 2722 (class 2606 OID 16402)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 2731 (class 2606 OID 41007)
-- Name: images none; Type: FK CONSTRAINT; Schema: public; Owner: uke
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT "none" FOREIGN KEY (userid) REFERENCES public.users(userid) NOT VALID;


-- Completed on 2019-11-17 11:35:57

--
-- PostgreSQL database dump complete
--

