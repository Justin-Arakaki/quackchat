import '../../utils/setupDotenv';
import { models } from '..';
import { SaveOptions, Transaction } from 'sequelize';
import { sequelize } from '../../utils/database';
import {
  createSampleUser,
  createSampleRoom,
} from '../../utils/testUtils/createSample';

describe('Room Model', () => {
  let transaction: Transaction;

  try {
    beforeEach(async () => {
      await sequelize.sync();
      transaction = await sequelize.transaction();
    });

    afterEach(async () => {
      await transaction.rollback();
    });

    afterAll(async () => {
      await sequelize.close();
    });

    it('should create a new room', async () => {
      const { user, room } = await createSamples({ transaction });

      expect(room.id).toBeDefined();
      expect(room.name).toBeDefined();
      expect(room.createdBy).toBe(user.id);
    });

    it('should retrieve a room', async () => {
      const { room } = await createSamples({ transaction });

      const retrievedRoom = await models.Room.findByPk(room.id, {
        transaction,
      });

      expect(retrievedRoom?.id).toBe(room.id);
      expect(retrievedRoom?.name).toBe(room.name);
      expect(retrievedRoom?.createdBy).toBe(room.createdBy);
    });

    it('should update a room', async () => {
      const { room } = await createSamples({ transaction });

      await room.update({ name: 'Updated Room' }, { transaction });

      expect(room.name).toBe('Updated Room');
    });

    it('should delete a room', async () => {
      const { room } = await createSamples({ transaction });

      await room.destroy({ transaction });
      const retrievedRoom = await models.Room.findByPk(room.id, {
        transaction,
      });

      expect(retrievedRoom).toBeNull();
    });
  } catch (err) {
    console.error(err);
  }
});

async function createSamples(options: SaveOptions) {
  const user = await createSampleUser(options);
  const room = await createSampleRoom(user.id, options);

  return { user, room };
}
