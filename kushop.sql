PGDMP      2            
    |            kushop    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    kushop    DATABASE     �   CREATE DATABASE kushop WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.874';
    DROP DATABASE kushop;
                postgres    false            �           0    0    DATABASE kushop    ACL     )   GRANT CONNECT ON DATABASE kushop TO dev;
                   postgres    false    4816            �            1259    16406    brands    TABLE     u   CREATE TABLE public.brands (
    "brandId" character varying(50) NOT NULL,
    "brandName" character varying(100)
);
    DROP TABLE public.brands;
       public         heap    postgres    false            �           0    0    TABLE brands    ACL     A   GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.brands TO dev;
          public          postgres    false    216            �            1259    16433    cartDtl    TABLE     �   CREATE TABLE public."cartDtl" (
    "cartId" character varying(100) NOT NULL,
    "pdId" character varying(100) NOT NULL,
    qty real,
    price real
);
    DROP TABLE public."cartDtl";
       public         heap    postgres    false            �           0    0    TABLE "cartDtl"    ACL     D   GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public."cartDtl" TO dev;
          public          postgres    false    218            �            1259    16436    carts    TABLE     �   CREATE TABLE public.carts (
    "cartId" character varying(100) NOT NULL,
    "cusId" character varying(100),
    "cartDate" date,
    "cartCf" boolean DEFAULT false
);
    DROP TABLE public.carts;
       public         heap    postgres    false            �           0    0    TABLE carts    ACL     @   GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.carts TO dev;
          public          postgres    false    219            �            1259    16425    members    TABLE        CREATE TABLE public.members (
    "memEmail" character varying(100) NOT NULL,
    "memName" character varying(100) NOT NULL,
    "dutyId" character varying(100) DEFAULT 'member'::character varying NOT NULL,
    "memHash" character varying(255) NOT NULL
);
    DROP TABLE public.members;
       public         heap    postgres    false            �           0    0    TABLE members    ACL     B   GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.members TO dev;
          public          postgres    false    217            �            1259    16398    products    TABLE     '  CREATE TABLE public.products (
    "pdId" character varying(50) NOT NULL,
    "pdName" character varying(100),
    "pdPrice" real,
    "pdRemark" text,
    "pdTypeId" character varying(100) DEFAULT NULL::character varying,
    "brandId" character varying(100) DEFAULT NULL::character varying
);
    DROP TABLE public.products;
       public         heap    postgres    false            �           0    0    TABLE products    ACL     C   GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.products TO dev;
          public          postgres    false    215            �          0    16406    brands 
   TABLE DATA           8   COPY public.brands ("brandId", "brandName") FROM stdin;
    public          postgres    false    216   �       �          0    16433    cartDtl 
   TABLE DATA           A   COPY public."cartDtl" ("cartId", "pdId", qty, price) FROM stdin;
    public          postgres    false    218          �          0    16436    carts 
   TABLE DATA           H   COPY public.carts ("cartId", "cusId", "cartDate", "cartCf") FROM stdin;
    public          postgres    false    219   u       �          0    16425    members 
   TABLE DATA           M   COPY public.members ("memEmail", "memName", "dutyId", "memHash") FROM stdin;
    public          postgres    false    217   �       �          0    16398    products 
   TABLE DATA           b   COPY public.products ("pdId", "pdName", "pdPrice", "pdRemark", "pdTypeId", "brandId") FROM stdin;
    public          postgres    false    215   !       0           2606    16424    brands brand_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brand_pkey PRIMARY KEY ("brandId");
 ;   ALTER TABLE ONLY public.brands DROP CONSTRAINT brand_pkey;
       public            postgres    false    216            4           2606    16441    cartDtl cartDtl_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."cartDtl"
    ADD CONSTRAINT "cartDtl_pkey" PRIMARY KEY ("cartId", "pdId");
 B   ALTER TABLE ONLY public."cartDtl" DROP CONSTRAINT "cartDtl_pkey";
       public            postgres    false    218    218            6           2606    16443    carts carts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");
 :   ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
       public            postgres    false    219            2           2606    16432    members members_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY ("memEmail");
 >   ALTER TABLE ONLY public.members DROP CONSTRAINT members_pkey;
       public            postgres    false    217            .           2606    16422    products products_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("pdId");
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    215            �      x�s20�t*J�K1�r20�0��b���� ^�G      �   H   x�32021�42 CN6�4����FX����1č���1B7�a#NC�����9�xc�1 �=... �[[      �   e   x���M
� ��Ey���� m�(Ey�66�of@����rJ�Y��y�[�@6�j��]�HÞlA�k��x��)�[ڲ4��nH�g�j)�/>BX      �   '  x���Ao�0���<W���6�A��Hv)X�������,�.��%o޼�'�����=iI{�5zp0M0����W�>��ct��*�r����خ��%X��ﲮ�d|v�ơ�_�!P�uot/ѵ���5_g��l�`�p8��
�pmE�\���9��]P��T�7�K@u�ݪڽ߬U�q�zN�]�pG�	���2�r��L�m:L*�����(����[�!)9���K�~��L$����!i�"q�ْ�i�A����P'��T.�Bh2ߕ+W>,����Vy��|�ژ8      �   �   x���1
1�zr�$�=�g��0�b/,�6��(���?�&�Z,�3�??�^��&.ā�x=q����z��*wDG|�;1�F���;�o5#H���u�>�u��(�
�mx��r:�q�d�;[?����^�z)��#Z	����+��{vԫ     