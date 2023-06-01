import { NotFoundException } from "../../../../errors/NotFoundException";
import { Announcement } from "../../entities/Announcement";
import { InMemoryAnnouncementRepository } from "../../repositories/InMemoryAnnouncementRepository";
import { DeleteAnnouncementUseCase } from "./DeleteAnnouncementUseCase";

let inMemoryAnnouncementRepository: InMemoryAnnouncementRepository;
let deleteAnnouncementUseCase: DeleteAnnouncementUseCase;

describe("Delete announcement", () => {
  beforeEach(() => {
    inMemoryAnnouncementRepository = new InMemoryAnnouncementRepository();
    deleteAnnouncementUseCase = new DeleteAnnouncementUseCase(
      inMemoryAnnouncementRepository
    );
  });

  it("should be able to update a announcement", async () => {
    const announcement = new Announcement(
      true,
      "Bike",
      "Bike description...",
      "old",
      250,
      true
    );
    await inMemoryAnnouncementRepository.create(announcement);

    await deleteAnnouncementUseCase.execute(
      String(inMemoryAnnouncementRepository.repository[0].id)
    );

    expect(inMemoryAnnouncementRepository.repository[0].deletedAt).toEqual(
      expect.any(Date)
    );
  });

  it("should not be able to delete a announcement with invalid id", () => {
    expect(async () => {
      return await deleteAnnouncementUseCase.execute("invalid_uuid");
    }).rejects.toThrow(NotFoundException);
  });
});
