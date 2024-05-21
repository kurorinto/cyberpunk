const withErrorHandler = (executor: (request: Request) => Promise<any>) => async (request: Request) => {
  try {
    const result = await executor(request);
    return Response.json({ success: true, result, message: null, code: null });
  } catch (e) {
    return Response.json({ success: false, result: null, message: null, code: 500 });
  }
};

export default withErrorHandler;
