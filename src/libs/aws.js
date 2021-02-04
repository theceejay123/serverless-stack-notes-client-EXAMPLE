import { Storage } from "aws-amplify";

export const uploadToS3 = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;
  const stored = await Storage.vault.put(fileName, file, {
    contentType: file.type,
  });

  return stored.key;
};
