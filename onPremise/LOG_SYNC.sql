USE [BDATOS]
GO
/****** Object:  Table [dbo].[LOG_SYNC]    Script Date: 25/06/2024 08:18:50 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LOG_SYNC](
	[CODIGO] [int] NOT NULL,
	[DESCRIPCION] [varchar](500) NOT NULL,
	[CODCIA] [char](2) NOT NULL,
	[IDCIA] [int] NOT NULL,
	[TIPODOCTO] [char](1) NOT NULL,
	[SERIE] [varchar](4) NOT NULL,
	[NUMERO] [bigint] NOT NULL,
	[TRAMA] [varchar](max) NULL,
	[FECHA_SAVE] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[LOG_SYNC] ADD  DEFAULT (getdate()) FOR [FECHA_SAVE]
