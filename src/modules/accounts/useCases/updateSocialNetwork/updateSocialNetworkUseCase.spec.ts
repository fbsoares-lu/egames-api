import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { File } from "../../../files/entities/File";
import { Profile } from "../../entities/Profile";
import { SocialNetwork } from "../../entities/SocialNetwork";
import { InMemoryProfileRepository } from "../../repositories/InMemoryProfileRepository";
import { InMemorySocialNetworkRepository } from "../../repositories/InMemorySocialNetworkRepository";
import { InMemorySocialNetworkTypeRepository } from "../../repositories/InMemorySocialNetworkTypeRepository";
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository";
import { UpdateSocialNetworkUseCase } from "./UpdateSocialNetworkUseCase";

let inMemorySocialNetworkRepository: InMemorySocialNetworkRepository;
let inMemorySocialNetworkTypeRepository: InMemorySocialNetworkTypeRepository;
let inMemoryUserRepository: InMemoryUserRepository;

let updateSocialNetworkUseCase: UpdateSocialNetworkUseCase;

describe("Update social network", () => {
  beforeEach(() => {
    inMemorySocialNetworkRepository = new InMemorySocialNetworkRepository();
    inMemorySocialNetworkTypeRepository =
      new InMemorySocialNetworkTypeRepository();
    inMemoryUserRepository = new InMemoryUserRepository();

    updateSocialNetworkUseCase = new UpdateSocialNetworkUseCase(
      inMemorySocialNetworkRepository,
      inMemorySocialNetworkTypeRepository,
      inMemoryUserRepository
    );
  });

  it("should be able to update an social network", async () => {
    inMemorySocialNetworkTypeRepository.create({
      name: "TWITTER",
      description: "Social description",
    });

    const socialNetworkType = inMemorySocialNetworkTypeRepository.repository[0];

    inMemoryUserRepository.create({
      name: "John Doe",
      email: "john.doe@email.com",
      password: "123456",
    });

    const user = inMemoryUserRepository.repository[0];

    inMemoryUserRepository.repository[0].profile = new Profile(
      "My bio about my perfil",
      new File("file-path", "originalName.jpg", "JPEG"),
      user
    );

    inMemorySocialNetworkRepository.create({
      profile: user.profile,
      socialNetworkType,
      socialNetworkUrl: "@my_twitter_account",
    });
    const socialNetwork = inMemorySocialNetworkRepository.repository[0];

    await updateSocialNetworkUseCase.execute({
      id: String(socialNetwork.id),
      userId: String(user.id),
      socialNetworkTypeId: String(socialNetworkType.id),
      socialNetworkUrl: "@my_twitter_account_updated",
    });

    expect(inMemorySocialNetworkRepository.repository[0].socialNetworkUrl).toBe(
      "@my_twitter_account_updated"
    );
  });

  it("should not be able to update an social network when profile already have the same social network type", async () => {
    inMemorySocialNetworkTypeRepository.create({
      name: "TWITTER",
      description: "Social description",
    });

    inMemoryUserRepository.create({
      name: "John Doe",
      email: "john.doe@email.com",
      password: "123456",
    });

    const user = inMemoryUserRepository.repository[0];

    inMemoryUserRepository.repository[0].profile = new Profile(
      "My bio about my perfil",
      new File("file-path", "originalName.jpg", "JPEG"),
      user
    );

    const socialNetworkType = inMemorySocialNetworkTypeRepository.repository[0];

    const socialNetwork = new SocialNetwork(
      "@my_twitter_account",
      socialNetworkType,
      user.profile
    );

    inMemorySocialNetworkRepository.create(socialNetwork);

    inMemoryUserRepository.repository[0].profile.socialNetworks = [
      socialNetwork,
    ];

    expect(async () => {
      return await updateSocialNetworkUseCase.execute({
        id: String(inMemorySocialNetworkRepository.repository[0].id),
        userId: String(user.id),
        socialNetworkTypeId: String(socialNetworkType.id),
        socialNetworkUrl: "@my_twitter_account",
      });
    }).rejects.toThrow(BadRequestException);
  });

  it("should not be able to update an social network with invalid social network type", async () => {
    inMemorySocialNetworkTypeRepository.create({
      name: "TWITTER",
      description: "Social description",
    });

    const socialNetworkType = inMemorySocialNetworkTypeRepository.repository[0];

    inMemoryUserRepository.create({
      name: "John Doe",
      email: "john.doe@email.com",
      password: "123456",
    });

    const user = inMemoryUserRepository.repository[0];

    inMemoryUserRepository.repository[0].profile = new Profile(
      "My bio about my perfil",
      new File("file-path", "originalName.jpg", "JPEG"),
      user
    );

    const socialNetwork = new SocialNetwork(
      "@my_twitter_account",
      socialNetworkType,
      user.profile
    );
    inMemorySocialNetworkRepository.create(socialNetwork);

    expect(async () => {
      return await updateSocialNetworkUseCase.execute({
        id: String(inMemorySocialNetworkRepository.repository[0].id),
        userId: String(user.id),
        socialNetworkTypeId: "invalid-uuid",
        socialNetworkUrl: "@my_twitter_account",
      });
    }).rejects.toThrow(NotFoundException);
  });

  it("should not be able to update an social network with invalid user", async () => {
    inMemorySocialNetworkTypeRepository.create({
      name: "TWITTER",
      description: "Social description",
    });

    inMemoryUserRepository.create({
      name: "John Doe",
      email: "john.doe@email.com",
      password: "123456",
    });

    const user = inMemoryUserRepository.repository[0];

    inMemoryUserRepository.repository[0].profile = new Profile(
      "My bio about my perfil",
      new File("file-path", "originalName.jpg", "JPEG"),
      user
    );

    const socialNetworkType = inMemorySocialNetworkTypeRepository.repository[0];

    const socialNetwork = new SocialNetwork(
      "@my_twitter_account",
      socialNetworkType,
      user.profile
    );
    inMemorySocialNetworkRepository.create(socialNetwork);

    expect(async () => {
      return await updateSocialNetworkUseCase.execute({
        id: String(inMemorySocialNetworkRepository.repository[0].id),
        userId: "invalid-uuid",
        socialNetworkTypeId: String(socialNetworkType.id),
        socialNetworkUrl: "@my_twitter_account",
      });
    }).rejects.toThrow(NotFoundException);
  });

  it("should not be able to update an social network with invalid social network id", async () => {
    inMemorySocialNetworkTypeRepository.create({
      name: "TWITTER",
      description: "Social description",
    });

    inMemoryUserRepository.create({
      name: "John Doe",
      email: "john.doe@email.com",
      password: "123456",
    });

    const user = inMemoryUserRepository.repository[0];

    inMemoryUserRepository.repository[0].profile = new Profile(
      "My bio about my perfil",
      new File("file-path", "originalName.jpg", "JPEG"),
      user
    );

    const socialNetworkType = inMemorySocialNetworkTypeRepository.repository[0];

    const socialNetwork = new SocialNetwork(
      "@my_twitter_account",
      socialNetworkType,
      user.profile
    );
    inMemorySocialNetworkRepository.create(socialNetwork);

    expect(async () => {
      return await updateSocialNetworkUseCase.execute({
        id: "invalid-uuid",
        userId: String(user.id),
        socialNetworkTypeId: String(socialNetworkType.id),
        socialNetworkUrl: "@my_twitter_account",
      });
    }).rejects.toThrow(NotFoundException);
  });
});
