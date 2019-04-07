const privateResolver = resolverFunction => async (parent, args, context) => {
  if (!context.req.user) {
    throw new Error("Authentication required.");
  }

  const resolved = await resolverFunction(parent, args, context);
  return resolved;
};

export default privateResolver;
