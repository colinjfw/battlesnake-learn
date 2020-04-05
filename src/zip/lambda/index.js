
function call(event) {
  let incoming = event.body;
  if (event.isBase64Encoded) {
    incoming = Buffer.from(incoming, "base64").toString("utf-8");
  }
  const req = JSON.parse(incoming);
  console.log("Request", req);
  switch (event.path) {
    case "/move":
      return { statusCode: 200, body: move(req) };
    case "/start":
      return { statusCode: 200, body: start(req) };
    default:
      return { statusCode: 404, body: { code: "NotFound" } };
  }
}

function respond(resp) {
  return {
    statusCode: resp.statusCode,
    isBase64Encoded: false,
    body: JSON.stringify(resp.body),
    headers: {
      'content-type': 'application/json',
    }
  };
}

exports.handler = async (event, context) => {
  try {
    const resp = respond(call(event));
    console.log("Response", resp);
    return resp;
  } catch (error) {
    console.error("Error", error);
    return respond({
      statusCode: 500,
      body: error.message,
    });
  }
};
