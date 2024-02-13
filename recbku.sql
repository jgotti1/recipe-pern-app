PGDMP         8    	            {            recipe    13.7    14.5                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16434    recipe    DATABASE     [   CREATE DATABASE recipe WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE recipe;
                recipe    false                       0    0    SCHEMA public    ACL     �   REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO recipe;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   recipe    false    3            �            1259    16435    ingredients    TABLE     p   CREATE TABLE public.ingredients (
    id bigint NOT NULL,
    recipe_id bigint NOT NULL,
    ingredient text
);
    DROP TABLE public.ingredients;
       public         heap    postgres    false            �            1259    16441    ingredients_id_seq    SEQUENCE     {   CREATE SEQUENCE public.ingredients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.ingredients_id_seq;
       public          postgres    false    200                       0    0    ingredients_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.ingredients_id_seq OWNED BY public.ingredients.id;
          public          postgres    false    201            �            1259    16443    recipes    TABLE     �   CREATE TABLE public.recipes (
    id bigint NOT NULL,
    recipe_name character varying(60) NOT NULL,
    recipe_type text NOT NULL,
    recipe_directions text
);
    DROP TABLE public.recipes;
       public         heap    postgres    false            �            1259    16449    recipe_id_seq    SEQUENCE     v   CREATE SEQUENCE public.recipe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.recipe_id_seq;
       public          postgres    false    202                       0    0    recipe_id_seq    SEQUENCE OWNED BY     @   ALTER SEQUENCE public.recipe_id_seq OWNED BY public.recipes.id;
          public          postgres    false    203            �           2604    16451    ingredients id    DEFAULT     p   ALTER TABLE ONLY public.ingredients ALTER COLUMN id SET DEFAULT nextval('public.ingredients_id_seq'::regclass);
 =   ALTER TABLE public.ingredients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200            �           2604    16452 
   recipes id    DEFAULT     g   ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipe_id_seq'::regclass);
 9   ALTER TABLE public.recipes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202                      0    16435    ingredients 
   TABLE DATA           @   COPY public.ingredients (id, recipe_id, ingredient) FROM stdin;
    public          postgres    false    200   {                 0    16443    recipes 
   TABLE DATA           R   COPY public.recipes (id, recipe_name, recipe_type, recipe_directions) FROM stdin;
    public          postgres    false    202   �                  0    0    ingredients_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.ingredients_id_seq', 153, true);
          public          postgres    false    201                       0    0    recipe_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.recipe_id_seq', 119, true);
          public          postgres    false    203            �           2606    16454    ingredients ingredients_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_pkey;
       public            postgres    false    200            �           2606    16456    recipes recipe_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipe_pkey PRIMARY KEY (id);
 =   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipe_pkey;
       public            postgres    false    202            �           2606    16457 &   ingredients ingredients_recipe_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);
 P   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_recipe_id_fkey;
       public          postgres    false    200    202    3722               .  x�uR;��0�ǧ舂*X��/����ڔD�{�ڑ�.I�@H�	� W� �M�$�Z��IH\����ׯ�����P�& �A<��F}O*D(ʪJP6�a%��mQ5�@�R�r�#�4��@�=����3͚!�
�;2}-�
��	�����h�6W%=�FO��{���۹x@��B蕵:�R���k��&�U.zblUTV��'��0�!V١�f� �FڣꙐ�)!6a�sg"�dr�V>�Fcz��K�3��<x�)}�ί�7���V-��J&����!���8�y�.w���Gtp/b^�Gg(�[A�=MdY��C�e������W{9?\���K��,�N�1�����y�Q�x%�R���V�#�`Pcx%۪WR�I�pV�d��g��Vr4 �N�Z3�۹|-�*[���Wo&㏆�e��N����H^9�A�>D6�$W����f�(9&�[3��9�ĥ�N��9�sj3߸gսО�}���|�9E�^^�H��$�W�7'%���ƍ���s�e����ȏ���e-���ڏ���H��$-�� �DV           x�mV�r�F<K_1�æ(9�n�RI��]V.��e	�X�>��?�5�|��$_���%�ua���LOO�,6��_9X�p�>Y��t���]�ge.65}tܳ
d%�7o~��������񪦇�\�Y����Γ�h��Q�R9IEjlI�-� 	Ԙsy�1���5�6~c�jD��s>EF�Rf��Vގ��x�u˩R�9W+񍍓a��������c�S�Ts@�O����U�S�,��W�ΰ�,���B6����4ٹe��~�C��|ʭ������bH�������rF7)�dT�0P'�Z;���t$&\U����p���A�=���_Ӈ)h;*Sot�D�6qZƳs ���P�URk,@֕1~;u��U}C=���}GO򍴧�:��B������FA:�N ��oi��="Ƀ%�A��U��H_����wK�:$n0��p%�Ti���9۰�RB�r��3N�E�f���l��xTFM��_[�P��j�P��m��v~��ׁ�G��*z�$!����W/*��xI�5���,�P�O}D��AlY��}8qr�����{w`��wܶ(�#f{v�IP�,�9�Ĵ1@�y�������f���H(�+�ؤ��p���f2v�-���p�Vǁde`�z����+�N�D�!HZ�(�)������[��^*b萸��:����^"�At� Ul�IK�W?i�(צĹ���!��l����H�j����VH��ri��Qr�65�+?��}
�=%�*�/��l�N�1�����Dc�!����uN����u+��(�9�4�5����@N��Ѷ*P;Qi�z���T�&��"���a�&"6���,�EB_5�}}N޸�{dvP��N���L��%9ڦ��e��?�-'NnHJ]`���~
�r�@靍�~��Fu����%��ff��f�!��h�`��/~C�;�v�f5��Hq_��]��9�<{�!�D�[���P%�
�����G8T�m�U��
�Ű�o�b�u�'�U�I��n�!K37��|���f��И7`ueG�l�#���-^*83ۋ���[z/H�Y!W�v�2)a��,�5�>��hE�A���ܿU�	�s'��[zgD�E��w��^�,��<D�t����{P� ��yZdC�XbX�Ir��v`i���+���?usKƢ�U	�������L;�C)�y$E�hEzH7������r{�^=Z#:k�J�~q�y9�_c�!��Y
H�g�"�ḬV�k���5�%��u�l�j��qMw�"oQ2�M��K�A��Yt�������T��     