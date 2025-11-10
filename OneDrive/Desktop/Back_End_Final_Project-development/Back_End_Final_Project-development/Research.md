# Research On Notion API
Notion acts as the project dashboard where I dont need to open my project to see the status of. Notion has an API for intergrations but Notion itself is already very compliated to use with many project boards and uses. First steps to actually use and learn Notion before using their API. After knowing a bit of Notion, using an their API can be achieved to actually see a results.

https://developers.notion.com/docs/getting-started

# Research On Google docs API
Google docs acts as front end controller where I can direct the actual parts of a story project.

When I feel like creating a new story in google docs, google's API integration connects that to this
API and then connects it to Notion where I can track it. Google has an Google cloud project which is where my story projects are located in(my personal google drive.) which can also act in the place for firebase for storing data. Firebase is currently just a metadata base for this API.

https://developers.google.com/workspace/docs/api/quickstart/nodejs

# Connecting the two together/Use case
My API acts as the bridge between them both and can read the status in Notion to see the progress being made. The plan to ingrate Notion and Google docs APIs to have a folder with all the necessary files for using their API ingratation and testing using my actual story projects. This is beyond the content knowledge of this course, but at least getting some of the information to do and actually implement in Notion is the final goal for this project. Just like a normal API I would need to create two pairs of API functions to read my REST API functions for it to ingrated.

## Diagram
User(me) --> Google Docs(Story Projects) --> My REST API(The bridge from google docs to Notion) --> Notion API --> Notion (Dashboard) -- > Database(Firebase.)


# Story API endpoint planning

Each story has four paramaters the story genre, type(ie format), an expected release date, and status for publishing.
This will serve as the baseline for CRUD operations and API endpoint creations. Other information like synopsis, characters will be considered but not required as of Nov 6th 2025.



Parameter example 
```json
{
    genre: Seinen,
    type: manhwa,
    expected_release_date: Unknown,
    status: pre-development
}