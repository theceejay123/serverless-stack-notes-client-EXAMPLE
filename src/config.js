const config = {
  STRIPE_PUBLIC_KEY:
    "pk_test_51IGW7gBwyxqz1AptuKk3RIBpsVRzd32HtgwL19bov5GCaJH4rzMu3CtmxaYhkzOA1FqCfS7L9XqlCJDhCiyNKewj00aS7bWpOF",
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "ca-central-1",
    BUCKET: "notes-app-upload-example",
  },
  apiGateway: {
    REGION: "ca-central-1",
    URL: "https://tfs4exb9zi.execute-api.ca-central-1.amazonaws.com/prod",
  },
  cognito: {
    REGION: "ca-central-1",
    USER_POOL_ID: "ca-central-1_LNtJnTEq5",
    APP_CLIENT_ID: "67hnd98i5u10t8r40sb0cg4rvk",
    IDENTITY_POOL_ID: "ca-central-1:19ddbc34-dfaa-4357-9020-55f6d4e23b02",
  },
};

export default config;
