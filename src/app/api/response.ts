export interface GenericResponse {
  success: boolean;
  errors: any;
  page?: any;
  data?: any;
}

export const responseOk = (data?: any): Response => {
  return Response.json({ success: true, data } as GenericResponse, {
    status: 200,
  });
};

export const responseOkPage = (page: any): Response => {
  return Response.json({ success: true, page } as GenericResponse, {
    status: 200,
  });
};

export const responseNoContent = (): Response => {
  return new Response(null, { status: 204 });
};

export const responseBadRequest = (errors: any): Response => {
  return Response.json({ success: false, errors } as GenericResponse, {
    status: 400,
  });
};

export const responseUnauthenticated = (): Response => {
  return Response.json(
    {
      success: false,
      errors: { message: "Not authenticated" },
    } as GenericResponse,
    { status: 401 }
  );
};

export const responseNotFound = (): Response => {
  return Response.json(
    { success: false, errors: { message: "Not found" } } as GenericResponse,
    { status: 404 }
  );
};
