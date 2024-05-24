type ExecutorResult = Promise<Parameters<typeof Response.json>>

const withErrorHandler = (executor: (request: Request) => ExecutorResult) => async (request: Request) => {
  try {
    const [result, init] = await executor(request) ?? null;
    return Response.json({ success: true, result, message: null, code: null }, init);
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;
      return Response.json({ success: false, result: null, message: message || null, code: 500 });
    }
    return Response.json({ success: false, result: null, message: null, code: 500 });
  }
};

export default withErrorHandler;
