PGDMP     4    !        	        {            recipe    14.5    14.5     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    24731    recipe    DATABASE     j   CREATE DATABASE recipe WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE recipe;
                postgres    false            ?            1259    24742    ingredients    TABLE     p   CREATE TABLE public.ingredients (
    id bigint NOT NULL,
    recipe_id bigint NOT NULL,
    ingredient text
);
    DROP TABLE public.ingredients;
       public         heap    postgres    false            ?            1259    24741    ingredients_id_seq    SEQUENCE     {   CREATE SEQUENCE public.ingredients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.ingredients_id_seq;
       public          postgres    false    212            ?           0    0    ingredients_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.ingredients_id_seq OWNED BY public.ingredients.id;
          public          postgres    false    211            ?            1259    24733    recipes    TABLE     ?   CREATE TABLE public.recipes (
    id bigint NOT NULL,
    recipe_name character varying(30) NOT NULL,
    recipe_type text NOT NULL,
    recipe_directions text
);
    DROP TABLE public.recipes;
       public         heap    postgres    false            ?            1259    24732    recipe_id_seq    SEQUENCE     v   CREATE SEQUENCE public.recipe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.recipe_id_seq;
       public          postgres    false    210            ?           0    0    recipe_id_seq    SEQUENCE OWNED BY     @   ALTER SEQUENCE public.recipe_id_seq OWNED BY public.recipes.id;
          public          postgres    false    209            b           2604    24745    ingredients id    DEFAULT     p   ALTER TABLE ONLY public.ingredients ALTER COLUMN id SET DEFAULT nextval('public.ingredients_id_seq'::regclass);
 =   ALTER TABLE public.ingredients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            a           2604    24736 
   recipes id    DEFAULT     g   ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipe_id_seq'::regclass);
 9   ALTER TABLE public.recipes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            ?          0    24742    ingredients 
   TABLE DATA           @   COPY public.ingredients (id, recipe_id, ingredient) FROM stdin;
    public          postgres    false    212   ?       ?          0    24733    recipes 
   TABLE DATA           R   COPY public.recipes (id, recipe_name, recipe_type, recipe_directions) FROM stdin;
    public          postgres    false    210   ?       ?           0    0    ingredients_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.ingredients_id_seq', 110, true);
          public          postgres    false    211                        0    0    recipe_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.recipe_id_seq', 110, true);
          public          postgres    false    209            f           2606    24749    ingredients ingredients_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_pkey;
       public            postgres    false    212            d           2606    24740    recipes recipe_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipe_pkey PRIMARY KEY (id);
 =   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipe_pkey;
       public            postgres    false    210            g           2606    24750 &   ingredients ingredients_recipe_id_fkey    FK CONSTRAINT     ?   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);
 P   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_recipe_id_fkey;
       public          postgres    false    212    3172    210            ?   V   x?3??440?tJMMS.I-?2?
X"	???sJ?̍???Ԃ??".sc(/??????<????4C2$?j????H? ?2"f      ?   ?   x???;?0??)?(n??(H4H??4??C1Nl?Y????f?il???[?.?z:???7?{?[???Ő??c?==W?E?H???9ˬ?a??[:?
*] #i??+??X?P??W???M1x|x????~?N=?????+>     