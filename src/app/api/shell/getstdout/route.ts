import { NextResponse } from "next/server";
import {exec} from "child_process"
import { promisify } from "util";
import { NextApiRequest } from "next";
const execPromise = promisify(exec);

const command="pwd"

export async  function POST(request:Request){
    try{
        const command=(await request.json()).command.trim()
        console.log(command)
        const { stdout, stderr } = await execPromise(command);
        console.log(stdout)
        return NextResponse.json({ message: stdout }, { status: 200 });

    }catch(error){
        console.log(error)
        return NextResponse.json({ message: "internal server error" }, { status: 200 });

    }

}