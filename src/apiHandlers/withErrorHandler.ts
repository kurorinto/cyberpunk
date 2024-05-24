const withErrorHandler = (executor: (request: Request) => Promise<any>) => async (request: Request) => {
  try {
    const result = await executor(request) ?? null;
    return Response.json({ success: true, result, message: null, code: null });
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      return Response.json({ success: false, result: null, message, code: 500 });
    }
    return Response.json({ success: false, result: null, message: null, code: 500 });
  }
};

export default withErrorHandler;
