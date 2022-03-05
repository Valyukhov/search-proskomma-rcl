import axios from 'axios';
import React, { useState, useEffect } from 'react';
import YAML from 'js-yaml';
import { books } from './config';

function useFetchUsfm({ input, owner, repo, server, bookCodes }) {
  const [projects, setProjects] = React.useState([]);
  const [usfms, setUsfms] = useState();

  // const link = `https://git.door43.org/${owner}/${repo}/raw/branch/master/01-GEN.usfm`;
  // useEffect(() => {
  //   axios
  //     .get(link)
  //     .then((result) => console.log(result.data))
  //     .catch((error) => console.log(error));
  // }, [link]);
  const link = `https://${server}/${owner}/${repo}/raw/branch/master/manifest.yaml`;
  React.useEffect(() => {
    axios
      .get(link)
      .then((res) => {
        const json = res.data ? YAML.load(res.data) : null;
        // console.log(json.projects);
        setProjects(json.projects);
      })
      .catch((err) => console.log(err));
  }, [link]);
  useEffect(() => {
    const _usfm = [];

    const getProjects = async () => {
      const _projects = projects.filter((project) => {
        return bookCodes.includes(project.identifier);
      });

      await Promise.all(
        _projects.map((project) =>
          axios
            .get(
              `https://git.door43.org/${owner}/${repo}/raw/branch/master/${project.path.substr(
                2
              )}`
            )
            .then((data) => {
              _usfm.push({ id: project.identifier, usfm: data.data });
            })
            .catch((err) => console.log(err))
        )
      );
      if (_usfm.length === bookCodes.length) {
        setUsfms(_usfm);
      }
    };

    getProjects();
  }, [projects]);

  useEffect(() => {
    if (usfms) {
      console.log(usfms);
    }
  }, [usfms]);

  return { projects, usfms };
}

export default useFetchUsfm;
