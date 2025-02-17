export type JoblistProps = {
  jobList: JobdataApi[]; 
  isLoading : boolean;
}

export type JobProps = {
  jobData: JobdataApi;
}

export type JobdataApi = {
  id: number;
  employer: {
    name: string;
    url: string;
  }
  logo_url: string;
  headline: string;
}

export type JobsArray = {
  hits: JobdataApi[];
}
 