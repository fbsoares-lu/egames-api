import { BadRequestException } from "../../../../errors/BadRequestException";
import { NotFoundException } from "../../../../errors/NotFoundException";
import { UnauthorizedException } from "../../../../errors/UnauthorizedException";
import { File } from "../../../files/entities/File";
import { Profile } from "../../entities/Profile";
import { SocialNetwork } from "../../entities/SocialNetwork";
import { InMemoryProfileRepository } from "../../repositories/InMemoryProfileRepository";
import { InMemorySocialNetworkRepository } from "../../repositories/InMemorySocialNetworkRepository";
import { InMemorySocialNetworkTypeRepository } from "../../repositories/InMemorySocialNetworkTypeRepository";
import { InMemoryUserRepository } from "../../repositories/InMemoryUserRepository";
import { CreateSocialNetworkUseCase } from "./CreateSocialNetworkUseCase";

let inMemorySocialNetworkRepository: InMemorySocialNetworkRepository;
let inMemorySocialNetworkTypeRepository: InMemorySocialNetworkTypeRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryProfileRepository: InMemoryProfileRepository;

let createSocialNetworkUseCase: CreateSocialNetworkUseCase;

describe("Create social network", () => {
  beforeEach(() => {
    inMemorySocialNetworkRepository = new InMemorySocialNetworkRepository();
    inMemorySocialNetworkTypeRepository =
      new InMemorySocialNetworkTypeRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryProfileRepository = new InMemoryProfileRepository();

    createSocialNetworkUseCase = new CreateSocialNetworkUseCase(
      inMemorySocialNetworkRepository,
      inMemorySocialNetworkTypeRepository,
      inMemoryUserRepository
    );
  });

  it("should be able to create a new social network", async () => {
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

    await createSocialNetworkUseCase.execute({
      userId: String(user.id),
      socialNetworkTypeId: String(socialNetworkType.id),
      socialNetworkUrl: "@my_twitter_account",
    });

    expect(inMemorySocialNetworkRepository.repository[0].socialNetworkUrl).toBe(
      "@my_twitter_account"
    );
  });

  it("should not be able to create a new social network when profile already have the same social network type", async () => {
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

    inMemoryUserRepository.repository[0].profile.socialNetworks = [
      new SocialNetwork("@my_twitter_account", socialNetworkType, user.profile),
    ];

    expect(async () => {
      return await createSocialNetworkUseCase.execute({
        userId: String(user.id),
        socialNetworkTypeId: String(socialNetworkType.id),
        socialNetworkUrl: "@my_twitter_account",
      });
    }).rejects.toThrow(BadRequestException);
  });

  it("should not be able to create a social network with invalid social network type", async () => {
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

    expect(async () => {
      return await createSocialNetworkUseCase.execute({
        userId: String(user.id),
        socialNetworkTypeId: "invalid-uuid",
        socialNetworkUrl: "@my_twitter_account",
      });
    }).rejects.toThrow(NotFoundException);
  });

  it("should not be able to create a social network with invalid user", async () => {
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

    expect(async () => {
      return await createSocialNetworkUseCase.execute({
        userId: "invalid-uuid",
        socialNetworkTypeId: String(socialNetworkType.id),
        socialNetworkUrl: "@my_twitter_account",
      });
    }).rejects.toThrow(NotFoundException);
  });

  it("should not be able to create a social network when user does not have profile", async () => {
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

    const socialNetworkType = inMemorySocialNetworkTypeRepository.repository[0];

    expect(async () => {
      return await createSocialNetworkUseCase.execute({
        userId: String(user.id),
        socialNetworkTypeId: String(socialNetworkType.id),
        socialNetworkUrl: "@my_twitter_account",
      });
    }).rejects.toThrow(BadRequestException);
  });

  it("should not be able to create a social network with the same url and social type", async () => {
    inMemorySocialNetworkTypeRepository.create({
      name: "TWITTER",
      description: "Social description",
    });

    inMemoryUserRepository.create({
      name: "John Doe",
      email: "john.doe@email.com",
      password: "123456",
    });

    inMemoryUserRepository.create({
      name: "John Doe 2",
      email: "john.doe2@email.com",
      password: "123456",
    });

    const userOne = inMemoryUserRepository.repository[0];
    inMemoryUserRepository.repository[0].profile = new Profile(
      "My bio about my perfil",
      new File("file-path", "originalName.jpg", "JPEG"),
      userOne
    );

    const userTwo = inMemoryUserRepository.repository[1];
    inMemoryUserRepository.repository[1].profile = new Profile(
      "My bio about my perfil",
      new File("file-path", "originalName.jpg", "JPEG"),
      userTwo
    );

    const socialNetworkType = inMemorySocialNetworkTypeRepository.repository[0];

    inMemorySocialNetworkRepository.create({
      profile: userOne.profile,
      socialNetworkType,
      socialNetworkUrl: "@my_twitter_account",
    });

    expect(async () => {
      return await createSocialNetworkUseCase.execute({
        userId: String(userOne.id),
        socialNetworkTypeId: String(socialNetworkType.id),
        socialNetworkUrl: "@my_twitter_account",
      });
    }).rejects.toThrow(BadRequestException);
  });
});
