import { NextResponse } from "next/server";
import {exec} from "child_process"
import { promisify } from "util";
const execPromise = promisify(exec);

const command="pwd"

export async  function GET(request:Request){
    try{
        const { stdout, stderr } = await execPromise(command);
        console.log(stdout)
        return NextResponse.json({ message: stdout }, { status: 200 });

    }catch(error){
        console.log(error)
        return NextResponse.json({ message: "internal server error" }, { status: 501 });

    }

}