import { connectToDatabase } from "@/database/mongoose";
import { CreateBook, TextSegment } from "@/types";
import { generateSlug, serializeData } from "../utils";
import Book from "@/database/models/book.model";
import BookSegment from "@/database/models/book-segment.model";

export const createBook = async ( data: CreateBook ) => {
    try{
        await connectToDatabase();

        const slug = generateSlug(data.title);
        
        const existingBook = await Book.findOne({ slug }).lean(); 
        
        if (existingBook) {
            return {
                success: true,
                data: serializeData(existingBook),
                alreadyExists: true,
            }
        }

        //Todo: check subscription limits before creating a book

        const book = await Book.create({...data, slug, totalSegments: 0}); 

        return {
            success: true,
            data: serializeData(book),
        };
    } catch (e){
        console.error('Error creating a book' , e);
        return {
            success: false,
            error: e,
        }
    }
}

export const saveBookSegments = async (_bookId: string, _clerkId: string, _segments: TextSegment[]) => {
    try{
        void _clerkId;
        void _segments;

    } catch (e){
        console.error('Error saving book segments' , e);
        
        await BookSegment.deleteMany({ bookId: _bookId });
        await Book.findByIdAndDelete(_bookId);
        console.log('Deleted book segments and book due to failure to save segments.');
    }
};
