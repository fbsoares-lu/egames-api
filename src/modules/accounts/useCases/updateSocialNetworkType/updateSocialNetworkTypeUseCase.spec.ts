import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { InMemorySocialNetworkTypeRepository } from "../../repositories/InMemorySocialNetworkTypeRepository";
import { UpdateSocialNetworkTypeUseCase } from "./UpdateSocialNetworkTypeUseCase";

let inMemorySocialNetworkTypeRepository: InMemorySocialNetworkTypeRepository;
let updateSocialNetworkTypeUseCase: UpdateSocialNetworkTypeUseCase;

describe("Update social network type", () => {
  beforeEach(() => {
    inMemorySocialNetworkTypeRepository =
      new InMemorySocialNetworkTypeRepository();
    updateSocialNetworkTypeUseCase = new UpdateSocialNetworkTypeUseCase(
      inMemorySocialNetworkTypeRepository
    );
  });

  it("should be able to update an existing social network type", async () => {
    inMemorySocialNetworkTypeRepository.create({
      name: "TWITTER",
      description: "An social network called twitter",
    });

    await updateSocialNetworkTypeUseCase.execute({
      id: String(inMemorySocialNetworkTypeRepository.repository[0].id),
      name: "TWITTER",
      description: "Updated - An social network called twitter",
    });

    expect(
      inMemorySocialNetworkTypeRepository.repository[0].description
    ).toEqual("Updated - An social network called twitter");
  });

  it("should not be able to update an social network type that does not exist", async () => {
    expect(async () => {
      return await updateSocialNetworkTypeUseCase.execute({
        id: "invalid_uuid",
        name: "TWITTER",
        description: "An social network called twitter",
      });
    }).rejects.toThrow(NotFoundException);
  });

  it("should not be able to update a existing name", async () => {
    inMemorySocialNetworkTypeRepository.create({
      name: "TWITTER",
      description: "An social network called twitter",
    });

    inMemorySocialNetworkTypeRepository.create({
      name: "INSTAGRAM",
      description: "An social network called instagram",
    });

    expect(async () => {
      return await updateSocialNetworkTypeUseCase.execute({
        id: String(inMemorySocialNetworkTypeRepository.repository[0].id),
        name: "INSTAGRAM",
        description: "An social network called instagram",
      });
    }).rejects.toThrow(BadRequestException);
  });

  it("should be able to update the same name", async () => {
    inMemorySocialNetworkTypeRepository.create({
      name: "TWITTER",
      description: "An social network called twitter",
    });

    await updateSocialNetworkTypeUseCase.execute({
      id: String(inMemorySocialNetworkTypeRepository.repository[0].id),
      name: "TWITTER",
      description: "An social network called twitter",
    });

    expect(inMemorySocialNetworkTypeRepository.repository[0].name).toEqual(
      "TWITTER"
    );
  });
});
