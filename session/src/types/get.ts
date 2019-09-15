export interface GET {
  "/ping": {
    res: { count: number };
  };
  "/user/greet/:id": {
    req: { params: { id: string } };
    res: { message: string };
  };
}
