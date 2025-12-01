export async function POST(req: Request) {
  const { registrationId } = await req.json();

  return Response.json({
    checkout_url: `/mockpay?ref=${registrationId}`
  });
}
