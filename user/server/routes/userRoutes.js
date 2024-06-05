import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { getUser, updateUser, allUsers, createUser, editUser, deleteUser } from '../controllers/userController.js';
import { sendAccountDeletionEmail } from '../sendAccountDeletion.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// GET user
router.get('/get-user', userAuth, getUser);

router.get('/allusers', allUsers);

router.post('/create', createUser);

// UPDATE USER || PUT
router.put('/update-user', userAuth, updateUser);

router.put('/edit-user/:id', editUser);

router.delete('/delete/:id', deleteUser);

router.post('/send-delete-email', async (req, res) => {
  const { email, firstName } = req.body;

  try {
    await sendAccountDeletionEmail({ email, firstName });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

export default router;
