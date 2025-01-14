import connectDB from "@/config/database/connectDB";
import User from "@/schemas/User";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  try {
    const userId = (await params).id;
    const user = await User.findOne({ _id: userId });
    if (user) {
      return Response.json(user, { status: 200 });
    }
  } catch (error) {
    return Response.json(
      { message: "Impossible to retrieve User Information" },
      { status: 404 }
    );
  }
}
