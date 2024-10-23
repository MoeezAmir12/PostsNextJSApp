import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const GET = async(req: NextApiRequest,res: NextApiResponse) => {
try{
    const responseData = await axios?.get(`https://moeexposts.netlify.app/.netlify/functions/api/Getposts`)?.then(response => {
        return response?.data;
    })
  res.status(200).json(responseData);
}
catch(error: any)
{
    res?.status(500).json({
        message: "",
        error: "Internal Server Error"
    })
    throw new Error(error?.message);
}
}

export default GET;