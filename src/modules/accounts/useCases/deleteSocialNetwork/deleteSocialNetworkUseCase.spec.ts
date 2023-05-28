import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { File } from "../../../files/entities/File";
import { Profile } from "../../entities/Profile";
import { SocialNetwork } from "../../entities/SocialNetwork";
import { SocialNetworkType } from "../../entities/SocialNetworkType";
import { User } from "../../entities/User";
import { InMemoryProfileRepository } from "../../repositories/InMemoryProfileRepository";
import { InMemorySocialNetworkRepository } from "../../repositories/InMemorySocialNetworkRepository";
import { InMemorySocialNetworkTypeRepository } from "../../repositories/InMemorySocialNetworkTypeRepository";
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository";
import { DeleteSocialNetworkUseCase } from "./DeleteSocialNetworkUseCase";

let inMemorySocialNetworkRepository: InMemorySocialNetworkRepository;
let deleteSocialNetworkUseCase: DeleteSocialNetworkUseCase;

describe("Delete social network", () => {
  beforeEach(() => {
    inMemorySocialNetworkRepository = new InMemorySocialNetworkRepository();
    deleteSocialNetworkUseCase = new DeleteSocialNetworkUseCase(
      inMemorySocialNetworkRepository
    );
  });

  it("should be able to delete an social network", async () => {
    const user = new User("John Doe", "john.doe@email.com", "123456");
    const profile = new Profile(
      "My bio about my perfil",
      new File("file-path", "originalName.jpg", "JPEG"),
      user
    );
    const socialNetworkType = new SocialNetworkType("name", "description");

    inMemorySocialNetworkRepository.create({
      profile,
      socialNetworkType,
      socialNetworkUrl: "@my_twitter_account",
    });

    const socialNetwork = inMemorySocialNetworkRepository.repository[0];

    await deleteSocialNetworkUseCase.execute({
      id: String(socialNetwork.id),
    });

    expect(inMemorySocialNetworkRepository.repository[0].deletedAt).toBe(
      expect.any(Date)
    );
  });

  it("should not be delete an social network which does not exist", async () => {
    const user = new User("John Doe", "john.doe@email.com", "123456");
    const profile = new Profile(
      "My bio about my perfil",
      new File("file-path", "originalName.jpg", "JPEG"),
      user
    );
    const socialNetworkType = new SocialNetworkType("name", "description");

    inMemorySocialNetworkRepository.create({
      profile,
      socialNetworkType,
      socialNetworkUrl: "@my_twitter_account",
    });

    await deleteSocialNetworkUseCase.execute({
      id: "invalid-uuid",
    });

    expect(async () => {
      return await deleteSocialNetworkUseCase.execute({
        id: "invalid-uuid",
      });
    }).rejects.toThrow(NotFoundException);
  });
});
