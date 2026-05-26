#Library Managments System

1. **List actors** — Who uses the system?
   - member
   - librarian
   - manager

2. **List main actions** — What do they do?
   - Show Materials
   - Make a Loan
   - Return & Fine Processing
   - Make a Reservation
   - Make a Review
   - Manage Materiales
   - Manage users

3. **Find the nouns** — Each important noun often becomes a **collection**
   - Users
   - Materials (materialType: book | magazine | cd | map)
   - Loans
   - Reservations
   - Reviews

4. **Draw relationships**
   - users `librarian`(1) -> (M) loan
   - Material (1) -> (M) loan
   - users `members`(1) -> (M) loan
   - users `members`(M) -> (M) Reservations
   - Material (1) -> (M) Reservations
   - users `members`(1) -> (M) Review
   - Material (1) -> (M) Review

5. **Name fields by role**
   - Users {
     name , email , phone , registerDate , password ,
     role [member , librarian , manger ]
     ?address , ?birth , membershipNumber, //for member..
     ?responsibleDepartment //for librarian ..

     }

   - Materials {
     title, category , totalCopies, availableCopies, coverImageUrl,
     materialType: [ book , magazine , CD, map ]
     ?author, ?publisher, ?publicationYear, ISBN, //for book
     ?issueNumber, ?month, ?year, // for magazine

     }

   - Loan{
     loanDate, dueDate, ?actualReturnDate ,
     status [active | returned | overdue | cancelled],
     finePerDay, totalFine, fineStatus // for Fine ...
     memberId (REF : User ),
     librarianId (REF : User ),
     materialId(REF : Material )
     }

   - Reservations{
     reservationDate, queuePriority, notifyWhenAvailable ,status [pending | notified | complated | cancelled], CancellationDate ,
     materialId(REF : Material ),
     memberId (REF : User ),
     }

   - Reviews{
     stars , ?comment ,
     memberId(REF : Member),
     materialId(REF : Material ),
     }
