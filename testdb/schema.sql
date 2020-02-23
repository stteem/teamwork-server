--
-- PostgreSQL database dump
--

-- Dumped from database version 11.6 (Ubuntu 11.6-1.pgdg16.04+1)
-- Dumped by pg_dump version 12.0

-- Started on 2020-02-23 01:04:16

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

--
-- TOC entry 197 (class 1259 OID 22001363)
-- Name: articles; Type: TABLE; Schema: public; Owner: vrxlqfmbilgtpd
--

CREATE TABLE public.articles (
    articleid integer NOT NULL,
    title character varying,
    article text,
    createdon timestamp(4) without time zone,
    userid integer
);


ALTER TABLE public.articles OWNER TO vrxlqfmbilgtpd;

--
-- TOC entry 196 (class 1259 OID 22001361)
-- Name: articles_articleid_seq; Type: SEQUENCE; Schema: public; Owner: vrxlqfmbilgtpd
--

CREATE SEQUENCE public.articles_articleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_articleid_seq OWNER TO vrxlqfmbilgtpd;

--
-- TOC entry 3889 (class 0 OID 0)
-- Dependencies: 196
-- Name: articles_articleid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER SEQUENCE public.articles_articleid_seq OWNED BY public.articles.articleid;


--
-- TOC entry 201 (class 1259 OID 22003520)
-- Name: comments; Type: TABLE; Schema: public; Owner: vrxlqfmbilgtpd
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    articleid integer,
    comment text,
    createdon timestamp(4) without time zone,
    authorid integer
);


ALTER TABLE public.comments OWNER TO vrxlqfmbilgtpd;

--
-- TOC entry 200 (class 1259 OID 22003518)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: vrxlqfmbilgtpd
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO vrxlqfmbilgtpd;

--
-- TOC entry 3890 (class 0 OID 0)
-- Dependencies: 200
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 206 (class 1259 OID 26331086)
-- Name: feed; Type: TABLE; Schema: public; Owner: vrxlqfmbilgtpd
--

CREATE TABLE public.feed (
    id bigint,
    itemid integer,
    createdon timestamp(4) without time zone,
    title text,
    item text,
    userid integer,
    author character varying(255)
);


ALTER TABLE public.feed OWNER TO vrxlqfmbilgtpd;

--
-- TOC entry 203 (class 1259 OID 22003611)
-- Name: gifcomments; Type: TABLE; Schema: public; Owner: vrxlqfmbilgtpd
--

CREATE TABLE public.gifcomments (
    id integer NOT NULL,
    imageid integer,
    comment text,
    createdon timestamp(4) without time zone,
    authorid integer
);


ALTER TABLE public.gifcomments OWNER TO vrxlqfmbilgtpd;

--
-- TOC entry 202 (class 1259 OID 22003609)
-- Name: gifcomments_id_seq; Type: SEQUENCE; Schema: public; Owner: vrxlqfmbilgtpd
--

CREATE SEQUENCE public.gifcomments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gifcomments_id_seq OWNER TO vrxlqfmbilgtpd;

--
-- TOC entry 3891 (class 0 OID 0)
-- Dependencies: 202
-- Name: gifcomments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER SEQUENCE public.gifcomments_id_seq OWNED BY public.gifcomments.id;


--
-- TOC entry 205 (class 1259 OID 22003655)
-- Name: images; Type: TABLE; Schema: public; Owner: vrxlqfmbilgtpd
--

CREATE TABLE public.images (
    imageid integer NOT NULL,
    userid integer,
    imageurl text,
    title text,
    createdon timestamp(4) without time zone
);


ALTER TABLE public.images OWNER TO vrxlqfmbilgtpd;

--
-- TOC entry 204 (class 1259 OID 22003653)
-- Name: images_imageid_seq; Type: SEQUENCE; Schema: public; Owner: vrxlqfmbilgtpd
--

CREATE SEQUENCE public.images_imageid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_imageid_seq OWNER TO vrxlqfmbilgtpd;

--
-- TOC entry 3892 (class 0 OID 0)
-- Dependencies: 204
-- Name: images_imageid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER SEQUENCE public.images_imageid_seq OWNED BY public.images.imageid;


--
-- TOC entry 208 (class 1259 OID 26569068)
-- Name: items; Type: TABLE; Schema: public; Owner: vrxlqfmbilgtpd
--

CREATE TABLE public.items (
    itemid integer NOT NULL,
    imageurl text,
    article text,
    title text,
    userid integer,
    createdon timestamp(4) without time zone
);


ALTER TABLE public.items OWNER TO vrxlqfmbilgtpd;

--
-- TOC entry 207 (class 1259 OID 26569066)
-- Name: items_itemid_seq; Type: SEQUENCE; Schema: public; Owner: vrxlqfmbilgtpd
--

CREATE SEQUENCE public.items_itemid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_itemid_seq OWNER TO vrxlqfmbilgtpd;

--
-- TOC entry 3893 (class 0 OID 0)
-- Dependencies: 207
-- Name: items_itemid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER SEQUENCE public.items_itemid_seq OWNED BY public.items.itemid;


--
-- TOC entry 199 (class 1259 OID 22001711)
-- Name: users; Type: TABLE; Schema: public; Owner: vrxlqfmbilgtpd
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    email character varying(255),
    password character varying(255),
    gender character varying(255),
    jobrole character varying(255),
    department character varying(255),
    address character varying(255),
    maritalstatus character varying(255),
    date timestamp(6) without time zone,
    isadmin boolean
);


ALTER TABLE public.users OWNER TO vrxlqfmbilgtpd;

--
-- TOC entry 198 (class 1259 OID 22001709)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: vrxlqfmbilgtpd
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_userid_seq OWNER TO vrxlqfmbilgtpd;

--
-- TOC entry 3894 (class 0 OID 0)
-- Dependencies: 198
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- TOC entry 3742 (class 2604 OID 22001366)
-- Name: articles articleid; Type: DEFAULT; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER TABLE ONLY public.articles ALTER COLUMN articleid SET DEFAULT nextval('public.articles_articleid_seq'::regclass);


--
-- TOC entry 3744 (class 2604 OID 22003523)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 3745 (class 2604 OID 22003614)
-- Name: gifcomments id; Type: DEFAULT; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER TABLE ONLY public.gifcomments ALTER COLUMN id SET DEFAULT nextval('public.gifcomments_id_seq'::regclass);


--
-- TOC entry 3746 (class 2604 OID 22003658)
-- Name: images imageid; Type: DEFAULT; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER TABLE ONLY public.images ALTER COLUMN imageid SET DEFAULT nextval('public.images_imageid_seq'::regclass);


--
-- TOC entry 3747 (class 2604 OID 26569071)
-- Name: items itemid; Type: DEFAULT; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER TABLE ONLY public.items ALTER COLUMN itemid SET DEFAULT nextval('public.items_itemid_seq'::regclass);


--
-- TOC entry 3743 (class 2604 OID 22001714)
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- TOC entry 3749 (class 2606 OID 22001371)
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (articleid);


--
-- TOC entry 3753 (class 2606 OID 22003528)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 3755 (class 2606 OID 22003619)
-- Name: gifcomments gifcomments_pkey; Type: CONSTRAINT; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER TABLE ONLY public.gifcomments
    ADD CONSTRAINT gifcomments_pkey PRIMARY KEY (id);


--
-- TOC entry 3757 (class 2606 OID 22003663)
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (imageid);


--
-- TOC entry 3759 (class 2606 OID 26569076)
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (itemid);


--
-- TOC entry 3751 (class 2606 OID 22001719)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 3760 (class 2606 OID 26569077)
-- Name: items items_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vrxlqfmbilgtpd
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- TOC entry 3887 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: vrxlqfmbilgtpd
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO vrxlqfmbilgtpd;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 3888 (class 0 OID 0)
-- Dependencies: 635
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO vrxlqfmbilgtpd;


-- Completed on 2020-02-23 01:04:58

--
-- PostgreSQL database dump complete
--

