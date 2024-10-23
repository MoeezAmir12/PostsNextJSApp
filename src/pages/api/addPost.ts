// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.body.title);
  try{
      await axios?.post("https://moeexposts.netlify.app/.netlify/functions/api/Addpost",req?.body,{
        headers: {
          "Content-Type": "application/json"
        }
      })?.then(response => {
      return response?.data;
    })
    res.status(200).json({
      message: "Data Inserted Success"
    })
  }
  catch(error: any)
  {
    res.status(500).json({
      message: "Failed to insert"
    })
    throw new Error(error?.message);
  }
}
