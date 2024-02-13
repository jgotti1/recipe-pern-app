PGDMP                      {            railway    13.2    16.1 2    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17471    railway    DATABASE     r   CREATE DATABASE railway WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE railway;
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0    SCHEMA public    ACL     w   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO recipe;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    11                        3079    16927    timescaledb 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS timescaledb WITH SCHEMA public;
    DROP EXTENSION timescaledb;
                   false    11            �           0    0    EXTENSION timescaledb    COMMENT     i   COMMENT ON EXTENSION timescaledb IS 'Enables scalable inserts and complex queries for time-series data';
                        false    2            �            1259    17570    ingredients    TABLE     p   CREATE TABLE public.ingredients (
    id bigint NOT NULL,
    recipe_id bigint NOT NULL,
    ingredient text
);
    DROP TABLE public.ingredients;
       public         heap    postgres    false    11            �            1259    17576    ingredients_id_seq    SEQUENCE     {   CREATE SEQUENCE public.ingredients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.ingredients_id_seq;
       public          postgres    false    247    11            �           0    0    ingredients_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.ingredients_id_seq OWNED BY public.ingredients.id;
          public          postgres    false    248            �            1259    17578    recipes    TABLE     �   CREATE TABLE public.recipes (
    id bigint NOT NULL,
    recipe_name character varying(60) NOT NULL,
    recipe_type text NOT NULL,
    recipe_directions text
);
    DROP TABLE public.recipes;
       public         heap    postgres    false    11            �            1259    17584    recipe_id_seq    SEQUENCE     v   CREATE SEQUENCE public.recipe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.recipe_id_seq;
       public          postgres    false    11    249            �           0    0    recipe_id_seq    SEQUENCE OWNED BY     @   ALTER SEQUENCE public.recipe_id_seq OWNED BY public.recipes.id;
          public          postgres    false    250            �           2604    17586    ingredients id    DEFAULT     p   ALTER TABLE ONLY public.ingredients ALTER COLUMN id SET DEFAULT nextval('public.ingredients_id_seq'::regclass);
 =   ALTER TABLE public.ingredients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    248    247            �           2604    17587 
   recipes id    DEFAULT     g   ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipe_id_seq'::regclass);
 9   ALTER TABLE public.recipes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    250    249            �          0    17376    cache_inval_bgw_job 
   TABLE DATA           9   COPY _timescaledb_cache.cache_inval_bgw_job  FROM stdin;
    _timescaledb_cache          postgres    false    237   �5       �          0    17379    cache_inval_extension 
   TABLE DATA           ;   COPY _timescaledb_cache.cache_inval_extension  FROM stdin;
    _timescaledb_cache          postgres    false    238   �5       �          0    17373    cache_inval_hypertable 
   TABLE DATA           <   COPY _timescaledb_cache.cache_inval_hypertable  FROM stdin;
    _timescaledb_cache          postgres    false    236   �5       ~          0    16944 
   hypertable 
   TABLE DATA             COPY _timescaledb_catalog.hypertable (id, schema_name, table_name, associated_schema_name, associated_table_prefix, num_dimensions, chunk_sizing_func_schema, chunk_sizing_func_name, chunk_target_size, compression_state, compressed_hypertable_id, replication_factor) FROM stdin;
    _timescaledb_catalog          postgres    false    207   �5       �          0    17030    chunk 
   TABLE DATA           w   COPY _timescaledb_catalog.chunk (id, hypertable_id, schema_name, table_name, compressed_chunk_id, dropped) FROM stdin;
    _timescaledb_catalog          postgres    false    216   6       �          0    16995 	   dimension 
   TABLE DATA           �   COPY _timescaledb_catalog.dimension (id, hypertable_id, column_name, column_type, aligned, num_slices, partitioning_func_schema, partitioning_func, interval_length, integer_now_func_schema, integer_now_func) FROM stdin;
    _timescaledb_catalog          postgres    false    212   /6       �          0    17014    dimension_slice 
   TABLE DATA           a   COPY _timescaledb_catalog.dimension_slice (id, dimension_id, range_start, range_end) FROM stdin;
    _timescaledb_catalog          postgres    false    214   L6       �          0    17051    chunk_constraint 
   TABLE DATA           �   COPY _timescaledb_catalog.chunk_constraint (chunk_id, dimension_slice_id, constraint_name, hypertable_constraint_name) FROM stdin;
    _timescaledb_catalog          postgres    false    217   i6       �          0    17085    chunk_data_node 
   TABLE DATA           [   COPY _timescaledb_catalog.chunk_data_node (chunk_id, node_chunk_id, node_name) FROM stdin;
    _timescaledb_catalog          postgres    false    220   �6       �          0    17069    chunk_index 
   TABLE DATA           o   COPY _timescaledb_catalog.chunk_index (chunk_id, index_name, hypertable_id, hypertable_index_name) FROM stdin;
    _timescaledb_catalog          postgres    false    219   �6       �          0    17221    compression_chunk_size 
   TABLE DATA             COPY _timescaledb_catalog.compression_chunk_size (chunk_id, compressed_chunk_id, uncompressed_heap_size, uncompressed_toast_size, uncompressed_index_size, compressed_heap_size, compressed_toast_size, compressed_index_size, numrows_pre_compression, numrows_post_compression) FROM stdin;
    _timescaledb_catalog          postgres    false    232   �6       �          0    17150    continuous_agg 
   TABLE DATA           �   COPY _timescaledb_catalog.continuous_agg (mat_hypertable_id, raw_hypertable_id, user_view_schema, user_view_name, partial_view_schema, partial_view_name, bucket_width, direct_view_schema, direct_view_name, materialized_only) FROM stdin;
    _timescaledb_catalog          postgres    false    226   �6       �          0    17181 +   continuous_aggs_hypertable_invalidation_log 
   TABLE DATA           �   COPY _timescaledb_catalog.continuous_aggs_hypertable_invalidation_log (hypertable_id, lowest_modified_value, greatest_modified_value) FROM stdin;
    _timescaledb_catalog          postgres    false    228   �6       �          0    17171 &   continuous_aggs_invalidation_threshold 
   TABLE DATA           h   COPY _timescaledb_catalog.continuous_aggs_invalidation_threshold (hypertable_id, watermark) FROM stdin;
    _timescaledb_catalog          postgres    false    227   7       �          0    17185 0   continuous_aggs_materialization_invalidation_log 
   TABLE DATA           �   COPY _timescaledb_catalog.continuous_aggs_materialization_invalidation_log (materialization_id, lowest_modified_value, greatest_modified_value) FROM stdin;
    _timescaledb_catalog          postgres    false    229   47       �          0    17202    hypertable_compression 
   TABLE DATA           �   COPY _timescaledb_catalog.hypertable_compression (hypertable_id, attname, compression_algorithm_id, segmentby_column_index, orderby_column_index, orderby_asc, orderby_nullsfirst) FROM stdin;
    _timescaledb_catalog          postgres    false    231   Q7                 0    16966    hypertable_data_node 
   TABLE DATA           x   COPY _timescaledb_catalog.hypertable_data_node (hypertable_id, node_hypertable_id, node_name, block_chunks) FROM stdin;
    _timescaledb_catalog          postgres    false    208   n7       �          0    17142    metadata 
   TABLE DATA           R   COPY _timescaledb_catalog.metadata (key, value, include_in_telemetry) FROM stdin;
    _timescaledb_catalog          postgres    false    225   �7       �          0    17236 
   remote_txn 
   TABLE DATA           Y   COPY _timescaledb_catalog.remote_txn (data_node_name, remote_transaction_id) FROM stdin;
    _timescaledb_catalog          postgres    false    233   �7       �          0    16980 
   tablespace 
   TABLE DATA           V   COPY _timescaledb_catalog.tablespace (id, hypertable_id, tablespace_name) FROM stdin;
    _timescaledb_catalog          postgres    false    210   �7       �          0    17099    bgw_job 
   TABLE DATA           �   COPY _timescaledb_config.bgw_job (id, application_name, schedule_interval, max_runtime, max_retries, retry_period, proc_schema, proc_name, owner, scheduled, hypertable_id, config) FROM stdin;
    _timescaledb_config          postgres    false    222   8       �          0    17570    ingredients 
   TABLE DATA           @   COPY public.ingredients (id, recipe_id, ingredient) FROM stdin;
    public          postgres    false    247   28       �          0    17578    recipes 
   TABLE DATA           R   COPY public.recipes (id, recipe_name, recipe_type, recipe_directions) FROM stdin;
    public          postgres    false    249   p:       �           0    0    chunk_constraint_name    SEQUENCE SET     R   SELECT pg_catalog.setval('_timescaledb_catalog.chunk_constraint_name', 1, false);
          _timescaledb_catalog          postgres    false    218            �           0    0    chunk_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('_timescaledb_catalog.chunk_id_seq', 1, false);
          _timescaledb_catalog          postgres    false    215            �           0    0    dimension_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('_timescaledb_catalog.dimension_id_seq', 1, false);
          _timescaledb_catalog          postgres    false    211            �           0    0    dimension_slice_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('_timescaledb_catalog.dimension_slice_id_seq', 1, false);
          _timescaledb_catalog          postgres    false    213            �           0    0    hypertable_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('_timescaledb_catalog.hypertable_id_seq', 1, false);
          _timescaledb_catalog          postgres    false    206            �           0    0    bgw_job_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('_timescaledb_config.bgw_job_id_seq', 1000, false);
          _timescaledb_config          postgres    false    221            �           0    0    ingredients_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.ingredients_id_seq', 153, true);
          public          postgres    false    248            �           0    0    recipe_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.recipe_id_seq', 122, true);
          public          postgres    false    250            �           2606    17589    ingredients ingredients_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_pkey;
       public            postgres    false    247            �           2606    17591    recipes recipe_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipe_pkey PRIMARY KEY (id);
 =   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipe_pkey;
       public            postgres    false    249            �           2606    17592 &   ingredients ingredients_recipe_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);
 P   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_recipe_id_fkey;
       public          postgres    false    3316    249    247            �      x������ � �      �      x������ � �      �      x������ � �      ~      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �            x������ � �      �   @   x�K�(�/*IM�/-�L�L62OI6L4�5�HF�ɺ��&i�f��fF�Ɯ%\1z\\\ �_      �      x������ � �      �      x������ � �      �      x������ � �      �   .  x�uR;��0�ǧ舂*X��/����ڔD�{�ڑ�.I�@H�	� W� �M�$�Z��IH\����ׯ�����P�& �A<��F}O*D(ʪJP6�a%��mQ5�@�R�r�#�4��@�=����3͚!�
�;2}-�
��	�����h�6W%=�FO��{���۹x@��B蕵:�R���k��&�U.zblUTV��'��0�!V١�f� �FڣꙐ�)!6a�sg"�dr�V>�Fcz��K�3��<x�)}�ί�7���V-��J&����!���8�y�.w���Gtp/b^�Gg(�[A�=MdY��C�e������W{9?\���K��,�N�1�����y�Q�x%�R���V�#�`Pcx%۪WR�I�pV�d��g��Vr4 �N�Z3�۹|-�*[���Wo&㏆�e��N����H^9�A�>D6�$W����f�(9&�[3��9�ĥ�N��9�sj3߸gսО�}���|�9E�^^�H��$�W�7'%���ƍ���s�e����ȏ���e-���ڏ���H��$-�� �DV      �   �  x�mVMo�6=ۿbN���uv׎E�:ik4�7E� @��F+z)Q%)��[�I�=�7������ʈ/�m�3o޼7�����W���rCWV���W]�I�aefS�t\�
d� .,N��4�ﯿ?6����A�@[*���'[Ҋ��<�r�TS�*
�A�&��d*���D׶��ڪ�N�]H�N,Yy������L�┭?�ۮ5L�n�
'�2)y��W�;�oPe�m�n��*O!S��ќ�Z���WdQ�fQ�6�Z�-�Š_LG���|�������)�w!"��i��ZZ+gt�F�,j*��n�M�	�2R�6�p���Z�=_�~J�ڠm�L��� 6�ڡ=+"w�N�\&���83�/m��:�OO�BT��(�^~#���N����)]��je;iA��N ���h�j� �Ғ.!O��2ZH���=��{K��Dn��.�LЩ���Z��l��KJ�Qn�8Eٙ�m .g�Hō2��/��^�z	��ܱ�q��ʷ��t`���g�t$!�!m�UZ��:����e1��u��3��>(@�-{��t>�89�͞'��w+������!��$�1E ��[Dϥ�IS[z}�PT��.`�J�Ǖ������-l�ŏ5��IFz���}���8OD ���& ��e���)]q�k#����h:$.�*�N�x�>����]1H['��̫����1p��t���6M��ncKrê��:��a���G�%�L�E�G꺏0DO��F�@��.�#�Dn�&^�	�.��N��=�u!]����c������	R@�Y���X��|m��U��Fe��V,�w8�d�VZ� ����>��]�+D�V��H��dO��E9�<G�e��G�ߕ-7v��J`���zz6����r�[W#�'"�[�/�{װe�=�5	277��}v��ϕ[a�j���.�/p�b�U������.İT���D;��op�C�&�ʇ+hՅ�{)fI��#IQS�#1����I��ب�l5�|�Ƽ�M�g�K6���Z���K=�����!���Hrt�������@c�1�:��hFA��8�߬��	G�����0��E���@_^>��<�hOW�^����Td#�s?Ȇ.0�0Σ�䫫m�R @o+�����urF�^ţ,r0ܻ[3_5�V�C1��%��Q��7���!�ӳ~{`��Z#:ˣJ1~���\OϘ�$s�BޅN$c�	��}1V���!�<'�$�|��8�;B�WD�i#Ű�P�)d��6��p6r�ĩ@N�|�٫F���\��K�8Q����0�Bh����Fy������>�`�N�5�o"�&.��f|�������*����틫��\O�^�_�����7�Ϫ������Tw��������O�K=\���������i;�}�M�W|����y��������g�*?     