import mongoose, { Schema, Document } from 'mongoose';

interface Question extends Document {
  type: string; // categorize, cloze, comprehension
  text: string;
  options?: string[]; // For categorize
  image?: string;
  correctAnswer: any;
}

interface Form extends Document {
  title: string;
  headerImage?: string;
  questions: Question[];
  responses: any[];
}

const QuestionSchema: Schema = new Schema({
  type: { type: String, required: true },
  text: { type: String, required: true },
  options: [String],
  image: String,
  correctAnswer: Schema.Types.Mixed,
});

const FormSchema: Schema = new Schema({
  title: { type: String, required: true },
  headerImage: String,
  questions: [QuestionSchema],
  responses: [Schema.Types.Mixed],
});

export default mongoose.model<Form>('Form', FormSchema);
