import Course from "../modals/Course.js";
import Stream from "../modals/Stream.js";
import College from "../modals/College.js";

export const createCourse = async (req, res, next) => {
  const StreamID = req.params.streamId;
  const collegeId = req.params.collegeId;
  const newCourse = new Course(req.body);

  try {
    const savedCourse = await newCourse.save();
    try {
      await Stream.findByIdAndUpdate(StreamID, {
        $push: {
          courses: savedCourse._id,
        },
      });
      await College.findByIdAndUpdate(collegeId, {
        $push: {
          courses: savedCourse._id,
        },
      });
      await Course.findByIdAndUpdate(savedCourse._id, {
        $push: { colleges: collegeId },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedCourse);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id);
    if (!course) return next(createError(404, "Course not found"));
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  const collegeId = req.params.collegeId;
  try {
    const course = await Course.findByIdAndUpdate(req.params.id);
    if (!course) return next(createError(404, "Course not found"));

    await Course.findByIdAndDelete(req.params.id);
    try {
      await College.findByIdAndUpdate(collegeId, {
        $pull: {
          courses: savedCourse._id,
        },
      });
      await Course.findByIdAndUpdate(savedCourse._id, {
        $pull: { colleges: collegeId },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Course has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};
