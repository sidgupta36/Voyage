/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { DeleteTripThunk, UpdateTripThunk } from "@/store/slices/TripSlice";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* eslint-disable react/prop-types */
const UserTrip = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editData, setEditData] = useState({
    packageName: trip?.packageName || "",
    description: trip?.description || "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const GoToTripPage = (id) => {
    navigate(`/trip/${id}`);
  };

  const getPlacePhoto = async () => {
    const BASE_URL = "https://api.pexels.com/v1/search";

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          query: `${trip?.choice?.place} nature travel landscape`,
          per_page: 5,
        },
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        },
      });

      const images = response.data.photos.map((photo) => photo.src.landscape);
      setPhotoUrl(images[1]);
    } catch (error) {
      toast.error(error.message || "Failed to fetch images");
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowEditDialog(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const confirmEdit = async () => {
    if (!editData.packageName.trim()) {
      toast.error("Package name cannot be empty");
      return;
    }

    await dispatch(
      UpdateTripThunk({
        id: trip._id,
        packageName: editData.packageName,
        description: editData.description,
      })
    );
    setShowEditDialog(false);
  };

  const confirmDelete = async () => {
    await dispatch(DeleteTripThunk(trip._id));
    setShowDeleteDialog(false);
  };

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  return (
    <>
      <div
        onClick={() => GoToTripPage(trip?._id)}
        className="
          cursor-pointer 
          rounded-3xl overflow-hidden  
          backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700
          shadow-lg hover:shadow-2xl 
          hover:scale-[1.02]
          transition-all duration-300 
          animate-fade-in 
          w-full
          relative
          group
        "
      >
        {/* Image */}
        <div className="w-full h-44 overflow-hidden rounded-t-3xl relative">
          <img
            src={photoUrl}
            alt="location"
            className="
              w-full h-full object-cover 
              hover:scale-105 transition-transform duration-500
            "
          />

          {/* Action Buttons - Show on hover */}
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleEdit}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all"
              title="Edit Package"
            >
              <FiEdit2 size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-all"
              title="Delete Package"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>

        {/* Trip Details */}
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
            {trip?.packageName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize mb-2">
            📍 {trip?.trip?.trip_details?.location}
          </p>
          {trip?.description && (
            <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-2 mb-2">
              {trip.description}
            </p>
          )}
          <div className="flex gap-3 text-xs text-gray-600 dark:text-gray-400 mt-3">
            <span>🗓️ {trip?.choice?.days} days</span>
            <span>👥 {trip?.choice?.people}</span>
            <span>💰 {trip?.choice?.budget}</span>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Edit Trip Package</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Package Name
              </label>
              <Input
                value={editData.packageName}
                onChange={(e) =>
                  setEditData({ ...editData, packageName: e.target.value })
                }
                placeholder="Package name"
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Description (Optional)
              </label>
              <Input
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                placeholder="Description"
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEditDialog(false)}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              Cancel
            </Button>
            <Button onClick={confirmEdit} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Delete Trip Package</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 dark:text-gray-400 py-4">
            Are you sure you want to delete <strong>{trip?.packageName}</strong>? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              Cancel
            </Button>
            <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserTrip;
