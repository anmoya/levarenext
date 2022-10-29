import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reportId = req.query.id as string;

  if (!reportId)
    return res
      .status(400)
      .json({ message: "Es necesario enviar un [ID] de Reporte " });

  const report = await prisma.report.findFirst({
    where: {
      id: reportId,
    },
  });

  return res.status(200).json(report);
};

export default handler;
