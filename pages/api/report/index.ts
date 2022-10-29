import { PrismaClient, Report } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getReports();

    case "POST":
      return createReport(req, res);
  }

  async function getReports() {
    const reports = await prisma.report.findMany();

    return res.status(200).json(reports);
  }

  async function createReport(req: NextApiRequest, res: NextApiResponse) {
    // TODO: validate request
    const reportToCreate: Report = req.body;

    const createdReport = await prisma.report.create({
      data: {
        createdAt: new Date(Date.now()),
        customerId: reportToCreate.customerId,
      },
    });

    return res.status(200).json(createdReport);
  }
};

export default handler;
