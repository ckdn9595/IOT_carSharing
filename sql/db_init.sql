CREATE TABLE `tb_car` (
	`car_seq`	BIGINT	NOT NULL,
	`usr_seq`	BIGINT	NOT NULL,
	`chat_seq`	BIGINT	NOT NULL,
	`car_num`	VARCHAR(50)	NOT NULL,
	`car_isValid`	enum('Y', 'N')	NOT NULL	DEFAULT 'N',
	`car_rent_insurance_yn`	enum('Y', 'N')	NOT NULL	DEFAULT 'N',
	`car_img`	VARCHAR(255)	NOT NULL,
	`car_reg_dt`	DATETIME	NOT NULL,
	`car_class`	BIGINT	NOT NULL,
	`car_dy`	DECIMAL(12,9)	NOT NULL,
	`car_dx`	DECIMAL(12, 9)	NOT NULL
);

CREATE TABLE `tb_car_info` (
	`car_res_seq`	BIGINT	NOT NULL,
	`owner_seq`	BIGINT	NOT NULL,
	`usr_seq`	BIGINT	NOT NULL,
	`res_info_seq`	BIGINT	NOT NULL,
	`car_seq`	BIGINT	NOT NULL,
	`chat_seq`	BIGINT	NOT NULL,
	`res_date`	DATETIME	NOT NULL,
	`res_realtime`	VARCHAR(255)	NULL,
	`res_rate`	VARCHAR(255)	NULL,
	`res_img`	VARCHAR(255)	NULL,
	`res_check`	VARCHAR(200)	NULL,
	`res_pay_valid`	enum('Y', 'N')	NOT NULL	DEFAULT 'N',
	`res_end_valid`	enum('Y', 'N')	NOT NULL	DEFAULT 'N',
	`res_drive_valid`	enum('Y', 'N')	NOT NULL	DEFAULT 'N',
	`res_door_on`	enum('Y', 'N')	NOT NULL	DEFAULT 'N'
);

CREATE TABLE `tb_user` (
	`usr_seq`	BIGINT	NOT NULL,
	`usr_id`	VARCHAR(100)	NOT NULL,
	`usr_name`	VARCHAR(50)	NOT NULL,
	`usr_type`	enum('REGULAR', 'GUEST')	NOT NULL,
	`usr_stat`	enum('NORMAL', 'REST', 'STOP')	NOT NULL,
	`usr_befo_pwd`	VARCHAR(100)	NOT NULL,
	`usr_pwd`	VARCHAR(100)	NOT NULL,
	`usr_gender`	enum('M','F')	NOT NULL,
	`usr_birth_day`	VARCHAR(8)	NOT NULL,
	`usr_phone`	VARCHAR(20)	NOT NULL,
	`usr_dri_insurance_yn`	enum('Y', 'N')	NOT NULL	DEFAULT 'N',
	`usr_ps_info_proc_agmt_yn`	enum('Y', 'N')	NOT NULL	DEFAULT 'N',
	`usr_loc_base_svc_agmt_yn`	enum('Y', 'N')	NOT NULL	DEFAULT 'N'
);

CREATE TABLE `tb_payment` (
	`usr_seq`	BIGINT	NOT NULL,
	`card_num`	VARCHAR(20)	NOT NULL,
	`card_date`	VARCHAR(5)	NOT NULL,
	`card_cvc`	VARCHAR(5)	NOT NULL,
	`card_aprv`	enum('Y', 'N')	NOT NULL	DEFAULT 'N',
	`card_comp`	VARCHAR(50)	NOT NULL
);

CREATE TABLE `tb_mail_auth` (
	`key`	BIGINT	NOT NULL,
	`usr_seq`	BIGINT	NOT NULL,
	`create_dt`	DATETIME	NOT NULL
);

CREATE TABLE `tb_car_review` (
	`rev_seq`	BIGINT	NOT NULL,
	`car_res_seq`	BIGINT	NOT NULL,
	`owner_seq`	BIGINT	NOT NULL,
	`usr_seq`	BIGINT	NOT NULL,
	`res_info_seq`	BIGINT	NOT NULL,
	`car_seq`	BIGINT	NOT NULL,
	`chat_seq`	BIGINT	NOT NULL,
	`rev_content`	VARCHAR(255)	NULL,
	`rev_rate`	VARCHAR(255)	NULL,
	`rev_img`	VARCHAR(255)	NULL
);

CREATE TABLE `tb_chat` (
	`chat_seq`	BIGINT	NOT NULL,
	`owner_seq`	BIGINT	NOT NULL,
	`usr_seq`	BIGINT	NOT NULL
);

CREATE TABLE `tb_car_class` (
	`car_class`	BIGINT	NOT NULL,
	`car_model`	VARCHAR(50)	NOT NULL,
	`car_segment`	VARCHAR(50)	NOT NULL,
	`car_fuel`	VARCHAR(50)	NOT NULL,
	`car_rate`	INT	NOT NULL,
	`car_year`	INT	NOT NULL
);

CREATE TABLE `tb_chat_info` (
	`chat_info_seq`	BIGINT	NOT NULL,
	`chat_seq`	BIGINT	NOT NULL,
	`usr_seq`	BIGINT	NOT NULL,
	`chat_info`	VARCHAR(500)	NOT NULL,
	`req_dt`	DATETIME	NOT NULL
);

CREATE TABLE `tb_car_res_info` (
	`res_info_seq`	BIGINT	NOT NULL,
	`car_seq`	BIGINT	NOT NULL,
	`usr_seq`	BIGINT	NOT NULL,
	`chat_seq`	BIGINT	NOT NULL,
	`car_res_date`	DATETIME	NOT NULL,
	`res_res_check`	enum('Y', 'N')	NOT NULL	DEFAULT 'N',
	`res_reg_dt`	DATETIME	NOT NULL
);

ALTER TABLE `tb_car` ADD CONSTRAINT `PK_TB_CAR` PRIMARY KEY (
	`car_seq`,
	`usr_seq`,
	`chat_seq`
);

ALTER TABLE `tb_car_info` ADD CONSTRAINT `PK_TB_CAR_INFO` PRIMARY KEY (
	`car_res_seq`,
	`owner_seq`,
	`usr_seq`,
	`res_info_seq`,
	`car_seq`,
	`chat_seq`
);

ALTER TABLE `tb_user` ADD CONSTRAINT `PK_TB_USER` PRIMARY KEY (
	`usr_seq`
);

ALTER TABLE `tb_payment` ADD CONSTRAINT `PK_TB_PAYMENT` PRIMARY KEY (
	`usr_seq`
);

ALTER TABLE `tb_mail_auth` ADD CONSTRAINT `PK_TB_MAIL_AUTH` PRIMARY KEY (
	`key`,
	`usr_seq`
);

ALTER TABLE `tb_car_review` ADD CONSTRAINT `PK_TB_CAR_REVIEW` PRIMARY KEY (
	`rev_seq`,
	`car_res_seq`,
	`owner_seq`,
	`usr_seq`,
	`res_info_seq`,
	`car_seq`,
	`chat_seq`
);

ALTER TABLE `tb_chat` ADD CONSTRAINT `PK_TB_CHAT` PRIMARY KEY (
	`chat_seq`,
	`owner_seq`
);

ALTER TABLE `tb_car_class` ADD CONSTRAINT `PK_TB_CAR_CLASS` PRIMARY KEY (
	`car_class`
);

ALTER TABLE `tb_chat_info` ADD CONSTRAINT `PK_TB_CHAT_INFO` PRIMARY KEY (
	`chat_info_seq`,
	`chat_seq`,
	`usr_seq`
);

ALTER TABLE `tb_car_res_info` ADD CONSTRAINT `PK_TB_CAR_RES_INFO` PRIMARY KEY (
	`res_info_seq`,
	`car_seq`,
	`usr_seq`,
	`chat_seq`
);

ALTER TABLE `tb_car` ADD CONSTRAINT `FK_tb_car_class_TO_tb_car_1` FOREIGN KEY (
	`car_class`
)
REFERENCES `tb_car_class` (
	`car_class`
);
