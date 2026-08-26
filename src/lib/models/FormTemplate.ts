import mongoose from "mongoose";

const FormFieldSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: {
    type: String,
    enum: ["text", "email", "tel", "date", "select", "textarea", "number"],
    required: true,
  },
  label: { type: String, required: true },
  placeholder: { type: String },
  required: { type: Boolean, default: true },
  options: [String], // For select type
  step: { type: Number, required: true }, // Which step this field belongs to
  order: { type: Number, required: true }, // Order within step
  conditional: {
    dependsOn: String, // Field ID this depends on
    value: String, // Value that triggers this field
  },
});

const FormTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "Behaviour Assessment Form" },
    version: { type: Number, required: true, default: 1 },
    active: { type: Boolean, default: true },
    steps: [
      {
        stepNumber: Number,
        title: String,
        description: String,
      },
    ],
    fields: [FormFieldSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.FormTemplate ||
  mongoose.model("FormTemplate", FormTemplateSchema);
