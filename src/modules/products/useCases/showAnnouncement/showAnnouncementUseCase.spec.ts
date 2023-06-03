import { NotFoundException } from "../../../../errors/NotFoundException";
import { Announcement } from "../../entities/Announcement";
import { InMemoryAnnouncementRepository } from "../../repositories/InMemoryAnnouncementRepository";
import { ShowAnnouncementUseCase } from "./ShowAnnouncementUseCase";

let inMemoryAnnouncementRepository: InMemoryAnnouncementRepository;
let showAnnouncementUseCase: ShowAnnouncementUseCase;

describe("Show announcement", () => {
  beforeEach(() => {
    inMemoryAnnouncementRepository = new InMemoryAnnouncementRepository();
    showAnnouncementUseCase = new ShowAnnouncementUseCase(
      inMemoryAnnouncementRepository
    );
  });

  it("should be able to show a announcement", async () => {
    const announcement = new Announcement(
      "Bike",
      "Bike description...",
      "old",
      250,
      true
    );
    await inMemoryAnnouncementRepository.create(announcement);

    const response = await showAnnouncementUseCase.execute(
      String(inMemoryAnnouncementRepository.repository[0].id)
    );

    expect(response?.id).toEqual(
      inMemoryAnnouncementRepository.repository[0].id
    );
  });
});
