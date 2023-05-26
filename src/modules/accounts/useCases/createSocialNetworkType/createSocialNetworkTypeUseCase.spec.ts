import { BadRequestException } from "../../../../errors/BadRequestException";
import { InMemorySocialNetworkTypeRepository } from "../../repositories/InMemorySocialNetworkTypeRepository";
import { CreateSocialNetworkTypeUseCase } from "./CreateSocialNetworkTypeUseCase";

let inMemorySocialNetworkTypeRepository: InMemorySocialNetworkTypeRepository;
let createSocialNetworkTypeUseCase: CreateSocialNetworkTypeUseCase;

describe("Create social network type", () => {
  beforeEach(() => {
    inMemorySocialNetworkTypeRepository =
      new InMemorySocialNetworkTypeRepository();
    createSocialNetworkTypeUseCase = new CreateSocialNetworkTypeUseCase(
      inMemorySocialNetworkTypeRepository
    );
  });

  it("should be able to create a new social network type", async () => {
    await createSocialNetworkTypeUseCase.execute({
      name: "TWITTER",
      description: "An social network called twitter",
    });

    expect(inMemorySocialNetworkTypeRepository.repository[0].name).toEqual(
      "TWITTER"
    );
  });

  it("should not be able to create an social network type with the same name", async () => {
    await createSocialNetworkTypeUseCase.execute({
      name: "TWITTER",
      description: "An social network called twitter",
    });

    expect(async () => {
      return await createSocialNetworkTypeUseCase.execute({
        name: "TWITTER",
        description: "Another description to social network called twitter",
      });
    }).rejects.toThrow(BadRequestException);
  });
});
