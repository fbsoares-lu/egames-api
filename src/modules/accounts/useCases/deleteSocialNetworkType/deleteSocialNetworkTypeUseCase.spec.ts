import { NotFoundException } from "../../../../errors/NotFoundException";
import { InMemorySocialNetworkTypeRepository } from "../../repositories/InMemorySocialNetworkTypeRepository";
import { DeleteSocialNetworkTypeUseCase } from "./DeleteSocialNetworkTypeUseCase";

let inMemorySocialNetworkTypeRepository: InMemorySocialNetworkTypeRepository;
let deleteSocialNetworkTypeUseCase: DeleteSocialNetworkTypeUseCase;

describe("Delete social network type", () => {
  beforeEach(() => {
    inMemorySocialNetworkTypeRepository =
      new InMemorySocialNetworkTypeRepository();
    deleteSocialNetworkTypeUseCase = new DeleteSocialNetworkTypeUseCase(
      inMemorySocialNetworkTypeRepository
    );
  });

  it("should be able to delete an social network type", async () => {
    inMemorySocialNetworkTypeRepository.create({
      name: "TWITTER",
      description: "An social network called twitter",
    });

    const socialNetworkType = inMemorySocialNetworkTypeRepository.repository[0];

    const id = socialNetworkType.id as string;
    await deleteSocialNetworkTypeUseCase.execute({ id });

    expect(socialNetworkType.deletedAt).toEqual(expect.any(Date));
  });

  it("should not be able to delete an social network type that does not exist", async () => {
    expect(async () => {
      return await deleteSocialNetworkTypeUseCase.execute({ id: "invalid_id" });
    }).rejects.toThrow(NotFoundException);
  });
});
