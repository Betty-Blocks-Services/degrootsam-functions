import expressionParser from "angular-expressions";

const generateWordDocument = async ({
  publicTemplateUrl,
  model,
  property: [{ name: propertyName }],
  fileName,
  variables,
}) => {
  const parser = expressionParser.configure({
    filters: {}, // optional: define your custom filters here
  });

  const variableMap = variables.reduce((previousValue, currentValue) => {
    previousValue[currentValue.key] = currentValue.value;
    return previousValue;
  }, {});

  const buffer = await generateDocx(publicTemplateUrl, variableMap, {
    linebreaks: true,
    paragraphLoop: true,
    parser,
  });

  const reference = await storeFile(model.name, propertyName, {
    contentType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    extension: "docx",
    fileName,
    fileBuffer: buffer,
  });

  return {
    result: reference,
  };
};

export default generateWordDocument;
