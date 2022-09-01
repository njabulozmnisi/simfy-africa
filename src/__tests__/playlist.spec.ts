import supertest from "supertest";
import { app } from "../app";

describe("playlist", () => {
  // jest.setTimeout(90 * 1000);

  describe("get playlist route", () => {
    describe("given the playlist does not exist",  () => {
      it("should return a 404", async () => {
        
        await supertest(app).get(`/playlist/5`).expect(404);
        
      });
    });
  });
});
