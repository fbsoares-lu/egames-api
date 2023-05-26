import { BadRequestException } from "../../../../errors/BadRequestException";
import { InMemorySocialNetworkTypeRepository } from "../../repositories/InMemorySocialNetworkTypeRepository";
import { ListSocialNetworkTypeUseCase } from "./ListSocialNetworkTypeUseCase";

let inMemorySocialNetworkTypeRepository: InMemorySocialNetworkTypeRepository;
let listSocialNetworkTypeUseCase: ListSocialNetworkTypeUseCase;

describe("List social network type", () => {
  beforeEach(() => {
    inMemorySocialNetworkTypeRepository =
      new InMemorySocialNetworkTypeRepository();
    listSocialNetworkTypeUseCase = new ListSocialNetworkTypeUseCase(
      inMemorySocialNetworkTypeRepository
    );
  });

  it("should be able to list all social network types", async () => {
    inMemorySocialNetworkTypeRepository.create({
      name: "TWITTER",
      description: "An social network called twitter",
    });

    inMemorySocialNetworkTypeRepository.create({
      name: "INSTAGRAM",
      description: "An social network called instagram",
    });

    inMemorySocialNetworkTypeRepository.create({
      name: "GITHUB",
      description: "An social network called github",
    });

    const networks = await listSocialNetworkTypeUseCase.execute();
    expect(networks.length).toEqual(3);
  });
});
